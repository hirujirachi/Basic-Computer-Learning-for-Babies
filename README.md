# KOMPUTERKU

An interactive educational website for children that introduces computer hardware through lessons, story narration, illustrated SVG animations, an interactive quiz, minigames, and a computer repair game.

## How to Run on XAMPP

1. Place the entire `KOMPUTERKU` folder inside `C:\xampp\htdocs\`.
2. Start Apache in the XAMPP Control Panel.
3. Open your browser and navigate to: `http://localhost/KOMPUTERKU/`
4. No database, no Composer, no npm — just Apache + PHP.

## Visit Online

1. Open any browser on your computer.
2. Copy & paste the link: https://komputerku.wuaze.com/
3. Enjoy the learning!

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
