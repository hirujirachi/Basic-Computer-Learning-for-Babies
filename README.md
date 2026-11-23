# KOMPUTERKU — Interactive Computer Hardware Education Website for Children

A fun, interactive educational website for children that introduces computer hardware through short lessons, colorful illustrations, an interactive quiz, and educational games — entirely in Bahasa Indonesia.

---

## 📁 Folder Structure

```
KOMPUTERKU/
├── index.php                  # Home page (Beranda)
├── learn.php                  # Mengenal Komputer – 5-step stepper course
├── games.php                  # Kuis & Permainan hub
├── match.php                  # Cocokkan Gambar minigame
├── mouse-practice.php         # Latihan Mouse minigame
├── typing.php                 # Latihan Mengetik minigame
├── quiz.php                   # Kuis Mengenal Komputer (5 questions)
├── fmc.php                    # Fix My Computer main screen
├── fmc-keyboard.php           # FMC – Keyboard repair scene
├── fmc-mouse.php              # FMC – Mouse repair scene
├── fmc-monitor.php            # FMC – Monitor repair scene
├── fmc-pc.php                 # FMC – PC/Cables repair scene
├── partials/
│   ├── head.php               # HTML <head>, meta, CSS links
│   ├── header.php             # Sticky nav header + sound toggle
│   └── footer.php             # Footer + Reset Progres button
├── assets/
│   ├── css/
│   │   ├── base.css           # CSS variables (design tokens), reset, typography
│   │   ├── components.css     # Shared components: buttons, cards, nav, modals
│   │   ├── home.css           # Home page specific styles
│   │   ├── learn.css          # Mengenal Komputer styles
│   │   ├── games.css          # Games hub styles
│   │   ├── match.css          # Cocokkan Gambar styles
│   │   ├── mouse-practice.css # Latihan Mouse styles
│   │   ├── typing.css         # Latihan Mengetik styles
│   │   ├── quiz.css           # Kuis styles
│   │   └── fmc.css            # Fix My Computer styles (all scenes)
│   └── js/
│       ├── storage.js         # localStorage helper (namespaced, versioned, safe)
│       ├── drag.js            # Pointer Events drag-and-drop helpers
│       ├── sound.js           # Web Audio API sounds + mute toggle
│       ├── modal.js           # Reusable modal / confirm / toast helper
│       ├── confetti.js        # Canvas confetti animation
│       ├── learn.js           # Mengenal Komputer course logic
│       ├── match.js           # Cocokkan Gambar game logic
│       ├── mouse-practice.js  # Latihan Mouse game logic
│       ├── typing.js          # Latihan Mengetik game logic
│       ├── quiz.js            # Kuis logic
│       ├── fmc.js             # FMC main screen logic
│       ├── fmc-keyboard.js    # FMC Keyboard repair
│       ├── fmc-mouse.js       # FMC Mouse repair
│       ├── fmc-monitor.js     # FMC Monitor repair
│       └── fmc-pc.js          # FMC PC/Cables repair
├── docs/
│   └── PLAN.md                # Implementation plan
└── README.md                  # This file
```

---

## 🚀 How to Run on XAMPP

### Prerequisites
- [XAMPP](https://www.apachefriends.org/) installed with Apache + PHP enabled

### Steps

1. **Copy the project** into your XAMPP `htdocs` folder:
   ```
   C:\xampp\htdocs\KOMPUTERKU\
   ```

2. **Start XAMPP** → Start the **Apache** module in the XAMPP Control Panel.

3. **Open in browser:**
   ```
   http://localhost/KOMPUTERKU/
   ```

4. No database, no Composer, no npm — just works! ✅

> **Note:** JavaScript ES modules are used (`<script type="module">`). These require the page to be served over HTTP (not opened as a local `file://` path). Always use the XAMPP Apache server.

---

## ✨ Feature List

| Feature | Description |
|---|---|
| **Home** | Animated hero with mascot, 3 menu cards with progress badges |
| **Mengenal Komputer** | 5-step stepper course with inline SVG illustrations, progress persistence, keyboard navigation |
| **Cocokkan Gambar** | Drag-and-drop picture matching game (Pointer Events, touch support) |
| **Latihan Mouse** | 30-second click-target game with countdown timer and best score |
| **Latihan Mengetik** | 5-word typing practice with per-character real-time color feedback |
| **Kuis** | 5-question multiple choice quiz with score persistence |
| **Fix My Computer** | 4 repair scenes: Keyboard (keycaps), Mouse (buttons), Monitor (screen swap), PC (cable routing) |
| **Sound Effects** | Web Audio API tones for correct/wrong/success/click with mute toggle |
| **Progress Persistence** | All game progress and scores saved to localStorage |
| **Responsive** | Mobile-first CSS, works at 360px–1280px+ |
| **Accessibility** | Semantic HTML, ARIA labels in Indonesian, keyboard navigable, `lang="id"` |

---

## 💾 localStorage Keys

All keys are prefixed with `komputerku:`.

| Key | Type | Description |
|---|---|---|
| `komputerku:learn:step` | number | Current lesson step (0–4) |
| `komputerku:learn:done` | boolean | Lesson completed |
| `komputerku:quiz:best` | number | Best quiz score (0–5) |
| `komputerku:mouse:best` | number | Best mouse game score |
| `komputerku:fmc:keyboard` | boolean | Keyboard repaired |
| `komputerku:fmc:mouse` | boolean | Mouse repaired |
| `komputerku:fmc:monitor` | boolean | Monitor repaired |
| `komputerku:fmc:pc` | boolean | PC repaired |
| `komputerku:fmc:done` | boolean | All 4 items repaired |
| `komputerku:sound:muted` | boolean | Sound muted |

---

## 🔄 How to Reset Progress

**Option 1 — In-app:** Click the small **"Reset Semua Progres"** link in the page footer. A confirmation dialog will appear.

**Option 2 — Browser DevTools:**
```javascript
Object.keys(localStorage)
  .filter(k => k.startsWith('komputerku:'))
  .forEach(k => localStorage.removeItem(k));
location.reload();
```

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| Markup | PHP 7+ (partials/routing only), HTML5 |
| Styles | CSS3 (custom properties, flexbox, grid, animations) |
| Behavior | Vanilla JavaScript ES6+ (ES modules) |
| State | Web Storage API (localStorage) |
| Sound | Web Audio API |
| Fonts | System font stack (no CDN) |
| Illustrations | Inline SVG (created from scratch) |
| Dependencies | **None** — no frameworks, libraries, or CDN |

---

## 📝 Technical Decisions & Notes

- **ES Modules over IIFEs:** Since XAMPP serves over HTTP, `<script type="module">` works reliably and provides clean import/export scoping without polluting globals.
- **Pointer Events API** (not HTML5 DnD): Used for all drag-and-drop to unify mouse, touch, and pen input, with `setPointerCapture` for smooth tracking.
- **SVG illustrations** are all created inline as pure SVG elements — no external image files needed. The style is flat, rounded, with consistent bright colors.
- **Sound effects** are synthesized via Web Audio API oscillators — no audio files needed, works offline instantly.
- **No database:** All state is localStorage. The `storage.js` helper wraps all access in try/catch to handle private browsing or quota errors gracefully.
- **PHP used minimally:** Only for `include` of partials (head/header/footer). No server-side logic, sessions, or database queries.

---

© 2024 KOMPUTERKU — Belajar Komputer Menyenangkan!
