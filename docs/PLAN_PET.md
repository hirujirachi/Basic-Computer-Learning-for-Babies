# PLAN_PET.md — Virtual Pet "Bitty" Implementation Plan

## Overview
Add a Virtual Pet system (Bitty + Byte Coins) on top of the existing KOMPUTERKU project.
No existing features are removed or changed except for the minimal hooks and UI additions described below.

---

## New Files

| File | Purpose |
|---|---|
| `assets/js/pet-catalog.js` | Single source of truth: PET_NAME, reward table, shop catalog |
| `assets/js/rewards.js` | Rewards module: claim(), ledger, BC balance, integrity check |
| `assets/js/bitty-renderer.js` | Layered SVG renderer for Bitty at any size |
| `assets/js/bitty-behavior.js` | Expressions, animations, idle timers, reactions |
| `assets/js/pet-hud.js` | BC coin HUD widget (injected into header) |
| `assets/css/pet.css` | All new pet-related styles |
| `shop.php` | Bitty's Shop page |
| `my-bitty.php` | My Bitty customization page |

---

## Modified Files

| File | Change |
|---|---|
| `partials/header.php` | Add BC HUD pill, two new nav links (Shop, My Bitty) |
| `partials/head.php` | Add pet.css include |
| `partials/footer.php` | Extend reset confirmation to include pet data |
| `index.php` | Add Bitty hero block below hero section |
| `assets/js/learn.js` | Hook: call Rewards.claim('learn_complete') in finish() |
| `assets/js/match.js` | Hook: call Rewards.claim('match_complete') in showWin() |
| `assets/js/mouse-practice.js` | Hook: call Rewards.claim('mouse_complete') in endGame() |
| `assets/js/typing.js` | Hook: call Rewards.claim('typing_complete') in endRound() |
| `assets/js/quiz.js` | Hook: call Rewards.claim('quiz_X') in showResults() |
| `assets/js/fmc.js` | Hook: call Rewards.claim('fmc_complete') in showVictory() |
| `README.md` | Document pet feature, rewards, shop, localStorage keys |

---

## Data Model (localStorage keys under `komputerku:` prefix)

| Key | Type | Description |
|---|---|---|
| `pet:v1` | object | Main pet state (balance, ledger, owned, equipped, checksum) |

### pet:v1 structure
```json
{
  "version": 1,
  "balance": 0,
  "ledger": {
    "learn_complete": false,
    "match_complete": false,
    "mouse_complete": false,
    "typing_complete": false,
    "quiz_3": false,
    "quiz_4": false,
    "quiz_5": false,
    "fmc_complete": false
  },
  "quizHighTier": 0,
  "quizAmountReceived": 0,
  "owned": ["casing_default", "bg_default"],
  "equipped": {
    "head": null,
    "face": null,
    "body": null,
    "casing": "casing_default",
    "background": "bg_default"
  },
  "checksum": "..."
}
```

---

## Hook Points

1. **learn.js `finish()`**: After `storage.setLearnDone(true)`, call `Rewards.claim('learn_complete')`.
2. **match.js `showWin()`**: After `unlockBadge`, call `Rewards.claim('match_complete')`.
3. **mouse-practice.js `endGame()`**: After computing best, call `Rewards.claim('mouse_complete')`.
4. **typing.js `endRound()`**: After `launchConfetti`, call `Rewards.claim('typing_complete')`.
5. **quiz.js `showResults()`**: Compute tier from score, call `Rewards.claim('quiz_3'|'quiz_4'|'quiz_5')`.
6. **fmc.js `showVictory()`**: Call `Rewards.claim('fmc_complete')` when all 4 repaired.

Each hook also shows a reward message in the existing success/result area.

---

## Reward Table

| Activity | Reward ID | Amount |
|---|---|---|
| Mengenal Komputer selesai | `learn_complete` | 20 BC |
| Cocokkan Gambar selesai | `match_complete` | 10 BC |
| Latihan Mouse selesai | `mouse_complete` | 10 BC |
| Latihan Mengetik selesai | `typing_complete` | 10 BC |
| Kuis 3/5 | `quiz_3` | 10 BC |
| Kuis 4/5 | `quiz_4` | 15 BC |
| Kuis 5/5 | `quiz_5` | 25 BC |
| Fix My Computer selesai | `fmc_complete` | 30 BC |

**Max total: 105 BC** (quiz counts once at highest tier)

---

## Shop Price Tiers

- **Cheap (10–15 BC)**: Body stickers, Blush, Mustache
- **Medium (20–30 BC)**: Head accessories, most casing designs, Round Glasses, Sunglasses
- **Premium (35–50 BC)**: Special backgrounds, Headphones, Crown, Wizard Hat

Rationale: a child can afford the first item after 1–2 activities. With max 105 BC, they can collect about 60–70% of the catalog.

---

## Bitty SVG Layers (back to front)
1. Background fill
2. Casing/body (desktop computer shape)
3. Screen face (expression: eyes, mouth)
4. Face accessories (glasses, blush, stickers)
5. Head accessories (hat, crown, etc.)
6. Body accessories (stickers on casing)

---

## Integrity Check
- Simple djb2-style hash over: `balance + JSON.stringify(ledger) + JSON.stringify(owned)`
- If mismatch on load: reconstruct balance from ledger (sum only granted rewards), show friendly message, save corrected state
- Documents in README that this is client-side deterrence only

---

## Anti-exploit Rules
- Rewards only claimable via internal module after genuine completion event
- No reward ids/amounts accepted from URL/form
- Reload mid-activity: storage is only written at true completion points
- Purchase re-validates: item exists, not owned, balance >= price
