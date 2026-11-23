import { sounds } from './sound.js';
import { launchConfetti } from './confetti.js';
import { unlockBadge } from './narration-badges.js';

// --- SVG icons for each hardware item ---
const svgIcons = {
  monitor: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="12" width="84" height="58" rx="7" fill="#3498DB"/>
    <rect x="16" y="20" width="68" height="42" rx="4" fill="#EAF4FB"/>
    <rect x="22" y="26" width="20" height="4" rx="2" fill="#3498DB" opacity=".5"/>
    <rect x="22" y="34" width="56" height="3" rx="1.5" fill="#BDC3C7" opacity=".6"/>
    <rect x="22" y="40" width="44" height="3" rx="1.5" fill="#BDC3C7" opacity=".5"/>
    <rect x="22" y="46" width="52" height="3" rx="1.5" fill="#BDC3C7" opacity=".5"/>
    <circle cx="66" cy="37" r="10" fill="#FFE66D" opacity=".9"/>
    <text x="66" y="41" text-anchor="middle" font-size="10" font-family="sans-serif">😊</text>
    <rect x="43" y="70" width="14" height="10" rx="2" fill="#2980B9"/>
    <rect x="34" y="80" width="32" height="6" rx="3" fill="#1A6E9E"/>
    <circle cx="85" cy="66" r="3" fill="#2ECC71"/>
  </svg>`,

  keyboard: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="28" width="88" height="48" rx="7" fill="#FF6B35"/>
    <rect x="12" y="34" width="10" height="8" rx="2.5" fill="white" opacity=".9"/>
    <rect x="26" y="34" width="10" height="8" rx="2.5" fill="white" opacity=".9"/>
    <rect x="40" y="34" width="10" height="8" rx="2.5" fill="white" opacity=".9"/>
    <rect x="54" y="34" width="10" height="8" rx="2.5" fill="white" opacity=".9"/>
    <rect x="68" y="34" width="10" height="8" rx="2.5" fill="white" opacity=".9"/>
    <rect x="80" y="34" width="12" height="8" rx="2.5" fill="white" opacity=".9"/>
    <rect x="12" y="46" width="14" height="8" rx="2.5" fill="white" opacity=".9"/>
    <rect x="30" y="46" width="10" height="8" rx="2.5" fill="white" opacity=".9"/>
    <rect x="44" y="46" width="10" height="8" rx="2.5" fill="white" opacity=".9"/>
    <rect x="58" y="46" width="10" height="8" rx="2.5" fill="white" opacity=".9"/>
    <rect x="72" y="46" width="20" height="8" rx="2.5" fill="white" opacity=".9"/>
    <rect x="12" y="58" width="10" height="8" rx="2.5" fill="#FFE66D"/>
    <rect x="26" y="58" width="10" height="8" rx="2.5" fill="white" opacity=".9"/>
    <rect x="40" y="58" width="10" height="8" rx="2.5" fill="white" opacity=".9"/>
    <rect x="54" y="58" width="10" height="8" rx="2.5" fill="white" opacity=".9"/>
    <rect x="68" y="58" width="22" height="8" rx="2.5" fill="#FFE66D"/>
    <rect x="28" y="70" width="44" height="8" rx="2.5" fill="white" opacity=".95"/>
    <text x="16" y="40.5" text-anchor="middle" font-size="4" font-weight="bold" fill="#E55A25" font-family="sans-serif">Q</text>
    <text x="30" y="40.5" text-anchor="middle" font-size="4" font-weight="bold" fill="#E55A25" font-family="sans-serif">W</text>
    <text x="44" y="40.5" text-anchor="middle" font-size="4" font-weight="bold" fill="#E55A25" font-family="sans-serif">E</text>
  </svg>`,

  mouse: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="50" cy="58" rx="28" ry="36" fill="#9B59B6"/>
    <line x1="50" y1="28" x2="50" y2="68" stroke="#E8D5F5" stroke-width="2"/>
    <rect x="43" y="40" width="14" height="12" rx="6" fill="#E8D5F5"/>
    <ellipse cx="50" cy="58" rx="28" ry="36" fill="none" stroke="#7D3C98" stroke-width="2"/>
    <path d="M 50 24 Q 50 10 72 8" stroke="#7D3C98" stroke-width="3" fill="none" stroke-linecap="round"/>
    <ellipse cx="38" cy="45" rx="5" ry="8" fill="white" opacity=".2" transform="rotate(-15 38 45)"/>
  </svg>`,

  pc: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <rect x="22" y="8" width="56" height="84" rx="7" fill="#E74C3C"/>
    <rect x="28" y="16" width="44" height="64" rx="4" fill="#C0392B"/>
    <circle cx="50" cy="26" r="7" fill="#E74C3C"/>
    <circle cx="50" cy="26" r="5" fill="#FF6B35"/>
    <text x="50" y="29" text-anchor="middle" font-size="6" fill="white" font-family="sans-serif">⏻</text>
    <circle cx="62" cy="26" r="3" fill="#2ECC71"/>
    <rect x="30" y="38" width="40" height="8" rx="2.5" fill="#E74C3C"/>
    <rect x="30" y="50" width="40" height="8" rx="2.5" fill="#E74C3C"/>
    <rect x="34" y="62" width="6" height="4" rx="1.5" fill="#95A5A6"/>
    <rect x="43" y="62" width="6" height="4" rx="1.5" fill="#95A5A6"/>
    <line x1="30" y1="72" x2="70" y2="72" stroke="#A93226" stroke-width="1.5"/>
    <line x1="30" y1="77" x2="70" y2="77" stroke="#A93226" stroke-width="1.5"/>
    <text x="50" y="92" text-anchor="middle" font-size="5.5" fill="#E74C3C" font-weight="bold" font-family="sans-serif">CPU</text>
  </svg>`,
};

const items = [
  { id: 'monitor', name: 'Monitor' },
  { id: 'keyboard', name: 'Keyboard' },
  { id: 'mouse', name: 'Mouse' },
  { id: 'pc', name: 'PC' },
];

let matchedCount = 0;
let imageOrder   = [];
let nameOrder    = [];
let ghost        = null;
let cleanups     = [];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function init() {
  matchedCount = 0;
  imageOrder   = shuffle(items);
  nameOrder    = shuffle(items);
  cleanups.forEach(fn => fn());
  cleanups = [];

  document.getElementById('matchScore').innerHTML =
    `Cocok: <span>0 / 4</span>`;
  document.getElementById('winPanel').style.display = 'none';

  renderBoard();
}

function renderBoard() {
  const imgCol  = document.getElementById('imageCol');
  const nameCol = document.getElementById('nameCol');

  imgCol.innerHTML  = '';
  nameCol.innerHTML = '';

  imageOrder.forEach(item => {
    const el = document.createElement('div');
    el.className  = 'match-image-item';
    el.dataset.id = item.id;
    el.setAttribute('draggable', 'false');
    el.setAttribute('role', 'button');
    el.setAttribute('tabindex', '0');
    el.setAttribute('aria-label', `Gambar ${item.name}, seret ke kotak nama yang sesuai`);
    el.innerHTML = svgIcons[item.id];
    imgCol.appendChild(el);
    attachDrag(el);
  });

  nameOrder.forEach(item => {
    const el = document.createElement('div');
    el.className  = 'match-name-box';
    el.dataset.target = item.id;
    el.setAttribute('role', 'region');
    el.setAttribute('aria-label', `Kotak nama ${item.name}`);
    el.textContent = item.name;
    nameCol.appendChild(el);
  });
}

function attachDrag(imgEl) {
  let startX, startY, ghostEl;

  function onDown(e) {
    if (imgEl.dataset.locked === 'true') return;
    if (e.button !== undefined && e.button !== 0 && e.pointerType === 'mouse') return;
    e.preventDefault();

    const rect = imgEl.getBoundingClientRect();
    startX = e.clientX;
    startY = e.clientY;

    // Create ghost
    ghostEl = document.createElement('div');
    ghostEl.className = 'drag-ghost';
    ghostEl.innerHTML = svgIcons[imgEl.dataset.id];
    ghostEl.style.left   = `${rect.left}px`;
    ghostEl.style.top    = `${rect.top}px`;
    ghostEl.style.width  = `${rect.width}px`;
    ghostEl.style.height = `${rect.height}px`;
    document.body.appendChild(ghostEl);
    ghost = ghostEl;

    imgEl.style.opacity = '.35';
    imgEl.setPointerCapture(e.pointerId);
  }

  function onMove(e) {
    if (!ghostEl) return;
    e.preventDefault();
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    const rect = imgEl.getBoundingClientRect();
    ghostEl.style.left = `${rect.left - (rect.width * .04) + dx}px`;
    ghostEl.style.top  = `${rect.top + dy}px`;

    // Hover highlight on name boxes
    document.querySelectorAll('.match-name-box').forEach(box => {
      box.classList.remove('is-hover');
    });
    const target = getHoveredBox(e.clientX, e.clientY);
    if (target) target.classList.add('is-hover');
  }

  function onUp(e) {
    if (!ghostEl) return;
    e.preventDefault();

    // Remove ghost
    ghostEl.remove();
    ghostEl = null;
    ghost   = null;
    imgEl.style.opacity = '';

    // Remove hover states
    document.querySelectorAll('.match-name-box').forEach(b => b.classList.remove('is-hover'));

    const target = getHoveredBox(e.clientX, e.clientY);
    if (!target) return;

    const imgId    = imgEl.dataset.id;
    const targetId = target.dataset.target;

    if (imgId === targetId) {
      // Correct match
      sounds.correct?.();
      target.classList.add('is-filled');
      target.innerHTML = `
        ${items.find(i => i.id === targetId).name}
        <span class="match-name-box__check" aria-hidden="true">
          <svg viewBox="0 0 12 12"><polyline points="2,6 5,9 10,3" stroke="white" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </span>
      `;
      imgEl.dataset.locked = 'true';
      imgEl.style.opacity = '.5';
      imgEl.style.cursor = 'default';

      matchedCount++;
      document.getElementById('matchScore').innerHTML =
        `Cocok: <span>${matchedCount} / 4</span>`;

      if (matchedCount === 4) {
        setTimeout(showWin, 500);
      }
    } else {
      // Wrong match
      sounds.wrong?.();
      target.classList.add('is-wrong');
      setTimeout(() => target.classList.remove('is-wrong'), 800);
    }
  }

  imgEl.addEventListener('pointerdown', onDown);
  imgEl.addEventListener('pointermove', onMove);
  imgEl.addEventListener('pointerup',   onUp);
  imgEl.addEventListener('pointercancel', onUp);

  const cleanup = () => {
    imgEl.removeEventListener('pointerdown', onDown);
    imgEl.removeEventListener('pointermove', onMove);
    imgEl.removeEventListener('pointerup',   onUp);
    imgEl.removeEventListener('pointercancel', onUp);
  };
  cleanups.push(cleanup);
}

function getHoveredBox(cx, cy) {
  const boxes = document.querySelectorAll('.match-name-box:not(.is-filled)');
  for (const box of boxes) {
    const r = box.getBoundingClientRect();
    if (cx >= r.left && cx <= r.right && cy >= r.top && cy <= r.bottom) {
      return box;
    }
  }
  return null;
}

function showWin() {
  sounds.success?.();
  unlockBadge('match_played');
  launchConfetti(4000);
  const win = document.getElementById('winPanel');
  win.style.display = 'flex';
  win.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

document.addEventListener('DOMContentLoaded', () => {
  init();
  document.getElementById('btnRestart').addEventListener('click', init);
});
