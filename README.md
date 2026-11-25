# KOMPUTERKU

An interactive educational website for children that introduces computer hardware through lessons, story narration, illustrated SVG animations, an interactive quiz, minigames, and a computer repair game.

## How to Run on XAMPP

1. Place the entire `KOMPUTERKU` folder inside `C:\xampp\htdocs\`.
2. Start Apache in the XAMPP Control Panel.
3. Open your browser and navigate to: `http://localhost/KOMPUTERKU/`
4. No database, no Composer, no npm — just Apache + PHP.

## Features

| Feature | Page | Description |
|---|---|---|
| Home | `index.php` | Hero, mascot Kiki, menu cards, badge shelf |
| Mengenal Komputer | `learn.php` | 5-step hardware lesson with progress |
| Perangkat Tambahan | `extra-hardware.php` | 5 peripherals with IO flow animations |
| Kuis & Permainan | `games.php` | Hub for all minigames and quiz |
| Cocokkan Gambar | `match.php` | Drag-and-drop image matching |
| Latihan Mouse | `mouse-practice.php` | 30-second click target game |
| Latihan Mengetik | `typing.php` | Real-time typing practice, 5 words/round |
| Perangkat Tambahan Game | `extra-match.php` | Drag/tap peripheral to its function |
| Kuis Mengenal Komputer | `quiz.php` | 5-question multiple choice quiz |
| Fix My Computer | `fmc.php` | Repair hub for 4 hardware items |
| Perbaiki Keyboard | `fmc-keyboard.php` | Drag keycaps to slots |
| Perbaiki Mouse | `fmc-mouse.php` | Drag left/right buttons to slots |
| Perbaiki Monitor | `fmc-monitor.php` | 2-step screen replacement drag |
| Perbaiki PC | `fmc-pc.php` | Drag cables to ports with SVG lines |

## Folder Structure

```
KOMPUTERKU/
├── index.php
├── learn.php
├── extra-hardware.php
├── extra-match.php
├── games.php
├── match.php
├── mouse-practice.php
├── typing.php
├── quiz.php
├── fmc.php
├── fmc-keyboard.php
├── fmc-mouse.php
├── fmc-monitor.php
├── fmc-pc.php
├── partials/
│   ├── head.php
│   ├── header.php
│   └── footer.php
├── pages/
│   └── partials/
│       └── mascot-banner.php
├── assets/
│   ├── css/
│   │   ├── base.css
│   │   ├── components.css
│   │   ├── extras.css
│   │   ├── home.css
│   │   ├── learn.css
│   │   ├── games.css
│   │   ├── match.css
│   │   ├── mouse-practice.css
│   │   ├── typing.css
│   │   ├── quiz.css
│   │   ├── fmc.css
│   │   └── extra-match.css
│   ├── js/
│   │   ├── storage.js
│   │   ├── modal.js
│   │   ├── sound.js
│   │   ├── confetti.js
│   │   ├── drag.js
│   │   ├── narration-badges.js
│   │   ├── player-profile.js
│   │   ├── learn.js
│   │   ├── match.js
│   │   ├── mouse-practice.js
│   │   ├── typing.js
│   │   ├── quiz.js
│   │   ├── extra-match.js
│   │   ├── fmc.js
│   │   ├── fmc-keyboard.js
│   │   ├── fmc-monitor.js
│   │   ├── fmc-mouse.js
│   │   └── fmc-pc.js
│   └── svg/
│       └── mascot-kiki.svg
└── docs/
    └── PLAN.md
```

## localStorage Keys

All keys are prefixed with `komputerku:`.

| Key | Type | Description |
|---|---|---|
| `komputerku:learn:step` | number | Current learn step (0–4) |
| `komputerku:learn:done` | boolean | Learn course completed |
| `komputerku:quiz:best` | number | Best quiz score (0–5) |
| `komputerku:mouse:best` | number | Best mouse click score |
| `komputerku:extra-match:best` | number | Best extra-match score (0–5) |
| `komputerku:extra-match:done` | boolean | Extra match completed |
| `komputerku:fmc:keyboard` | boolean | Keyboard repaired |
| `komputerku:fmc:mouse` | boolean | Mouse repaired |
| `komputerku:fmc:monitor` | boolean | Monitor repaired |
| `komputerku:fmc:pc` | boolean | PC repaired |
| `komputerku:fmc:done` | boolean | All 4 items repaired |
| `komputerku:sound:muted` | boolean | Sound muted preference |
| `komputerku:badges:v1` | string[] | Array of unlocked badge IDs |
| `komputerku:playerProfile:v1` | object | `{ name: string, avatarId: string }` |

## Badges

| ID | Emoji | Unlocked When |
|---|---|---|
| `first_learn` | 📚 | First step advanced in learn course |
| `learn_done` | 🎓 | Learn course completed |
| `quiz_played` | 🎯 | Quiz played at least once |
| `quiz_perfect` | 🏆 | Perfect score 5/5 in quiz |
| `fmc_first` | 🔧 | First FMC repair completed |
| `fmc_done` | 🛠️ | All 4 FMC repairs done |
| `extra_explored` | 🔍 | Extra hardware page visited |
| `extra_match_done` | 🔌 | Extra hardware minigame completed |
| `match_played` | 🃏 | Cocokkan Gambar or mouse practice finished |
| `typing_played` | ⌨️ | Typing practice round completed |
| `named_player` | 🌟 | Player name set |

## How to Reset Progress

Click the **"Reset Semua Progres"** button in the site footer. This clears all `komputerku:` keys from localStorage and reloads the page.

## Technology

- HTML5 · CSS3 (custom properties, BEM-ish) · Vanilla JS ES modules
- Native PHP (page composition only, no database)
- localStorage for all persistence
- Web Audio API for sound effects
- SpeechSynthesis API for narration read-aloud (`id-ID`)
- Pointer Events API for all drag-and-drop (mouse + touch)
- No external CDNs, no frameworks, works fully offline on XAMPP

## Accessibility

- `lang="id"` on `<html>`
- Semantic HTML5 elements throughout
- All interactive elements have `aria-label` attributes in Indonesian
- Keyboard navigation supported on all interactive items
- `prefers-reduced-motion` respected for all animations
- Visible `:focus-visible` styles on all focusable elements
- Touch targets ≥ 44px on interactive elements

---

## 🐾 Virtual Pet "Bitty" — Byte Coins System

### What is Bitty?
Bitty is a cute desktop computer virtual pet. Its screen is its face. Children earn Byte Coins (BC) by completing learning activities, and spend them in Bitty's Shop to buy accessories and decorations.

### New Pages

| Page | File | Description |
|---|---|---|
| Toko Bitty | `shop.php` | Shop to buy accessories with Byte Coins |
| My Bitty | `my-bitty.php` | Customize Bitty, equip/unequip accessories |

### Reward Table

| Activity | Reward ID | Amount (BC) |
|---|---|---|
| Mengenal Komputer selesai | `learn_complete` | 20 |
| Cocokkan Gambar selesai | `match_complete` | 10 |
| Latihan Mouse selesai | `mouse_complete` | 10 |
| Latihan Mengetik selesai | `typing_complete` | 10 |
| Kuis nilai 3/5 | `quiz_3` | 10 |
| Kuis nilai 4/5 | `quiz_4` | 15 |
| Kuis nilai 5/5 | `quiz_5` | 25 |
| Fix My Computer selesai | `fmc_complete` | 30 |

**Maximum total: 105 BC** (quiz counted once at highest tier reached)

**Quiz tier difference rule:** If a child scores 3/5 first (earns 10 BC), then retakes and scores 4/5, they receive only 5 BC extra (the difference). Retaking at the same or lower tier grants 0 BC. Scores 0–2 grant nothing.

### Shop Price List & Rationale

| Item | Category | Price (BC) |
|---|---|---|
| Pita Lucu | Head | 15 |
| Topi Kasual | Head | 20 |
| Topi Penyihir | Head | 30 |
| Headphone Musik | Head | 35 |
| Mahkota Raja | Head | 40 |
| Pipi Merah Muda | Face | 10 |
| Stiker Bintang (Muka) | Face | 10 |
| Kumis Lucu | Face | 15 |
| Kacamata Bulat | Face | 20 |
| Kacamata Hitam | Face | 25 |
| Stiker Petir | Body | 10 |
| Stiker Hati | Body | 10 |
| Stiker Bintang (Badan) | Body | 10 |
| Kasing Klasik | Casing | 0 (default) |
| Kasing Biru Langit | Casing | 20 |
| Kasing Merah Muda | Casing | 20 |
| Kasing Hijau Mint | Casing | 20 |
| Kasing Galaksi | Casing | 45 |
| Latar Polos | Background | 0 (default) |
| Kamar Tidur | Background | 25 |
| Ruang Komputer | Background | 25 |
| Taman Bunga | Background | 30 |
| Bawah Laut | Background | 35 |
| Luar Angkasa | Background | 40 |

**Price tier rationale:**
- **Cheap (10–15 BC):** Stickers, blush, mustache, bow — achievable after 1 activity
- **Medium (20–30 BC):** Glasses, common casings, common backgrounds — after 2–3 activities
- **Premium (35–50 BC):** Galaxy casing, headphones, crown, outer space — long-term goal
- Max 105 BC allows purchasing ~60–70% of catalog. This is intentional: some items require sustained engagement.

### New localStorage Keys

| Key | Type | Description |
|---|---|---|
| `komputerku:pet:v1` | object | Full pet state: balance, ledger, owned, equipped, checksum |

#### `pet:v1` schema
```json
{
  "version": 1,
  "balance": 0,
  "ledger": { "learn_complete": false, ... },
  "quizHighTier": 0,
  "quizAmountReceived": 0,
  "owned": ["casing_default", "bg_default"],
  "equipped": {
    "head": null,
    "face_glasses": null,
    "face_blush": null,
    "face_mustache": null,
    "face_sticker": null,
    "body_sticker": null,
    "casing": "casing_default",
    "background": "bg_default"
  },
  "checksum": "..."
}
```

### Anti-Exploit Measures (Client-Side Only)

- **Once-only rewards:** Each reward ID can only be claimed once. The ledger persists and is checked on every claim.
- **Quiz tier tracking:** `quizHighTier` stores the highest tier reached; only improvements grant coins.
- **Genuine completion gates:** Reward hooks are only called at true completion points in each module's existing logic (not from URL params or input fields).
- **Purchase re-validation:** Every purchase re-checks item exists, is not already owned, and balance ≥ price in real-time.
- **Integrity checksum:** A djb2-style hash over `balance|ledger|owned` is stored. On load, the hash is recomputed and compared. If mismatch (manual localStorage edit), balance is reconstructed from the ledger and state is re-saved with a friendly notification.
- **Never goes negative:** `spendCoins()` checks balance before deducting.

> ⚠️ **Limitation:** All anti-exploit measures are client-side. A determined user with browser DevTools can still manipulate localStorage. These are deterrents, not guarantees. A backend would be required for real enforcement.

### How to Edit the Catalog

All prices, reward amounts, and item definitions are in one file: `assets/js/pet-catalog.js`.

- To change a price: edit the `price` property of the item in `SHOP_CATALOG`.
- To change a reward amount: edit the `amount` property in `REWARD_TABLE`.
- To add a new item: add an entry to `SHOP_CATALOG` and add SVG rendering logic in `bitty-renderer.js`.
- To rename Bitty: change `PET_NAME` constant at the top of `pet-catalog.js`.

### How to Reset Pet Data

Click the **"Reset Semua Progres"** button in the site footer. This now also resets all Byte Coin and Bitty data. The dialog clearly states what will be erased.

To reset only pet data programmatically: `Rewards.resetPetData()` (from `assets/js/rewards.js`).

### New JS Files

| File | Purpose |
|---|---|
| `assets/js/pet-catalog.js` | Single source of truth: pet name, reward table, shop catalog |
| `assets/js/rewards.js` | Rewards module: claim, balance, ledger, integrity check |
| `assets/js/bitty-renderer.js` | Layered SVG renderer for Bitty at any size |
| `assets/js/bitty-behavior.js` | Expressions, animations, idle timers, reactions |
| `assets/js/pet-hud.js` | BC coin HUD widget in the site header |

### New CSS File

| File | Purpose |
|---|---|
| `assets/css/pet.css` | All Bitty/BC HUD/Shop/My Bitty UI styles |

