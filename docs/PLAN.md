# KOMPUTERKU — Implementation Plan

## Architecture

- **PHP** for page composition only (includes, routing, no DB)
- **Vanilla JS ES modules** via `<script type="module">` served over HTTP (works on XAMPP)
- **CSS** with custom properties (design tokens) + BEM-like class naming
- **localStorage** for all state (namespaced `komputerku:`)

## Folder Structure

```
KOMPUTERKU/
├── index.php                  # Home page
├── learn.php                  # Mengenal Komputer (5-step course)
├── games.php                  # Kuis & Permainan hub
├── match.php                  # Cocokkan Gambar minigame
├── mouse-practice.php         # Latihan Mouse minigame
├── typing.php                 # Latihan Mengetik minigame
├── quiz.php                   # Kuis Mengenal Komputer
├── fmc.php                    # Fix My Computer main screen
├── fmc-keyboard.php           # FMC – Keyboard repair scene
├── fmc-mouse.php              # FMC – Mouse repair scene
├── fmc-monitor.php            # FMC – Monitor repair scene
├── fmc-pc.php                 # FMC – PC/Cables repair scene
├── partials/
│   ├── head.php               # <head> with meta, CSS links, lang="id"
│   ├── header.php             # <header> with nav + sound toggle
│   └── footer.php             # <footer> + reset progress link
├── assets/
│   ├── css/
│   │   ├── base.css           # CSS variables, reset, typography, layout
│   │   ├── components.css     # Buttons, cards, modals, badges, progress, toast
│   │   ├── learn.css          # Mengenal Komputer styles
│   │   ├── games.css          # Games hub
│   │   ├── match.css          # Cocokkan Gambar
│   │   ├── mouse-practice.css # Latihan Mouse
│   │   ├── typing.css         # Latihan Mengetik
│   │   ├── quiz.css           # Kuis
│   │   └── fmc.css            # Fix My Computer (all scenes)
│   ├── js/
│   │   ├── storage.js         # localStorage helper (namespaced, versioned, safe)
│   │   ├── drag.js            # Pointer Events drag-and-drop helper (mouse+touch)
│   │   ├── sound.js           # Web Audio API sound effects + mute toggle
│   │   ├── modal.js           # Reusable modal/result/confirm dialog
│   │   ├── confetti.js        # Lightweight CSS/JS confetti
│   │   ├── learn.js           # Mengenal Komputer logic
│   │   ├── match.js           # Cocokkan Gambar logic
│   │   ├── mouse-practice.js  # Latihan Mouse logic
│   │   ├── typing.js          # Latihan Mengetik logic
│   │   ├── quiz.js            # Kuis logic
│   │   ├── fmc.js             # FMC main screen logic
│   │   ├── fmc-keyboard.js    # FMC Keyboard repair
│   │   ├── fmc-mouse.js       # FMC Mouse repair
│   │   ├── fmc-monitor.js     # FMC Monitor repair
│   │   └── fmc-pc.js          # FMC PC/Cables repair
│   └── svg/                   # Standalone SVG illustrations
│       ├── mascot.svg
│       ├── monitor.svg
│       ├── keyboard.svg
│       ├── mouse.svg
│       └── pc.svg
├── docs/
│   └── PLAN.md               # This file
└── README.md
```

## Design Tokens (CSS Variables)
- `--color-primary`: #FF6B35 (warm orange)
- `--color-secondary`: #4ECDC4 (teal)
- `--color-accent`: #FFE66D (yellow)
- `--color-success`: #2ECC71
- `--color-error`: #E74C3C
- `--color-warning`: #F39C12
- `--color-bg`: #FFF8F0 (warm cream)
- `--color-surface`: #FFFFFF
- `--color-text`: #2C3E50
- `--color-text-muted`: #7F8C8D
- `--radius-sm/md/lg/xl`: 8/12/20/32px
- `--shadow-*`: soft shadows

## localStorage Keys
- `komputerku:version` — data format version
- `komputerku:learn:step` — current step (0-based)
- `komputerku:learn:done` — boolean completed flag
- `komputerku:quiz:best` — best quiz score
- `komputerku:mouse:best` — best mouse score
- `komputerku:fmc:keyboard` — keyboard repaired boolean
- `komputerku:fmc:mouse` — mouse repaired boolean
- `komputerku:fmc:monitor` — monitor repaired boolean
- `komputerku:fmc:pc` — PC repaired boolean
- `komputerku:fmc:done` — all 4 repaired boolean
- `komputerku:sound` — sound enabled boolean

## Feature Task Order
1. Foundation (CSS, PHP partials, JS utils)
2. Home page
3. Mengenal Komputer
4. Games hub
5. Cocokkan Gambar
6. Latihan Mouse
7. Latihan Mengetik
8. Kuis
9. FMC main + all 4 repair scenes
10. README + final QA pass
