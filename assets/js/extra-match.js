import { storage } from './storage.js';
import { sounds } from './sound.js';
import { launchConfetti } from './confetti.js';
import { unlockBadge } from './narration-badges.js';

const PERIPHERALS = [
  {
    id: 'speaker',
    emoji: '🔊',
    name: 'Speaker',
    role: 'Output',
    roleId: 'output',
    hint: 'Mengeluarkan suara dari komputer',
  },
  {
    id: 'printer',
    emoji: '🖨️',
    name: 'Printer',
    role: 'Output',
    roleId: 'output',
    hint: 'Mencetak dokumen atau gambar ke kertas',
  },
  {
    id: 'headset',
    emoji: '🎧',
    name: 'Headset / Mic',
    role: 'Input & Output',
    roleId: 'io',
    hint: 'Mic mendengar suaramu (Input), earphone mengeluarkan suara (Output)',
  },
  {
    id: 'webcam',
    emoji: '📷',
    name: 'Webcam',
    role: 'Input',
    roleId: 'input',
    hint: 'Menangkap gambar/video dan mengirimnya ke komputer',
  },
  {
    id: 'flashdisk',
    emoji: '💾',
    name: 'Flashdisk',
    role: 'Penyimpanan',
    roleId: 'storage',
    hint: 'Menyimpan dan memindahkan data antar komputer',
  },
];

const FUNCTIONS = [
  { id: 'speaker',   text: 'Mengeluarkan suara dari komputer',          matchId: 'speaker' },
  { id: 'printer',   text: 'Mencetak tulisan atau gambar ke kertas',     matchId: 'printer' },
  { id: 'headset',   text: 'Mendengar dan berbicara saat video call',    matchId: 'headset' },
  { id: 'webcam',    text: 'Merekam video wajah untuk video call',       matchId: 'webcam' },
  { id: 'flashdisk', text: 'Menyimpan dan memindahkan file antar komputer', matchId: 'flashdisk' },
];

let matched      = 0;
let total        = PERIPHERALS.length;
let selectedItem = null;
let roundScore   = 0;
let attempts     = 0;

function el(id) { return document.getElementById(id); }

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function init() {
  matched      = 0;
  roundScore   = 0;
  attempts     = 0;
  selectedItem = null;

  el('gamePanel').style.display    = 'block';
  el('resultPanel').style.display  = 'none';

  renderBoard();
  updateProgress();
}

function renderBoard() {
  const imgCol  = el('extraImgCol');
  const funcCol = el('extraFuncCol');

  imgCol.innerHTML  = '';
  funcCol.innerHTML = '';

  const shuffledPeripherals = shuffle(PERIPHERALS);
  const shuffledFunctions   = shuffle(FUNCTIONS);

  shuffledPeripherals.forEach(p => {
    const card = document.createElement('div');
    card.className   = 'em-item em-item--peripheral';
    card.dataset.id  = p.id;
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `${p.name} – ${p.role}. Pilih untuk mencocokkan.`);
    card.innerHTML = `
      <span class="em-item__emoji" aria-hidden="true">${p.emoji}</span>
      <span class="em-item__name">${p.name}</span>
      <span class="em-item__role em-role--${p.roleId}">${p.role}</span>
    `;

    card.addEventListener('pointerdown', (e) => { e.preventDefault(); onSelectPeripheral(card, p.id); });
    card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelectPeripheral(card, p.id); } });

    attachDragFrom(card, p.id);
    imgCol.appendChild(card);
  });

  shuffledFunctions.forEach(f => {
    const slot = document.createElement('div');
    slot.className  = 'em-slot';
    slot.dataset.id = f.matchId;
    slot.setAttribute('role', 'button');
    slot.setAttribute('tabindex', '0');
    slot.setAttribute('aria-label', `Fungsi: ${f.text}`);
    slot.innerHTML = `<span class="em-slot__text">${f.text}</span>`;

    slot.addEventListener('pointerdown', (e) => { e.preventDefault(); onDropOnSlot(slot, f.matchId); });
    slot.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onDropOnSlot(slot, f.matchId); } });

    attachDropTarget(slot, f.matchId);
    funcCol.appendChild(slot);
  });
}

function onSelectPeripheral(card, id) {
  if (card.dataset.locked === 'true') return;

  document.querySelectorAll('.em-item--peripheral.is-selected').forEach(c => c.classList.remove('is-selected'));

  if (selectedItem === id) {
    selectedItem = null;
    return;
  }

  selectedItem = id;
  card.classList.add('is-selected');
}

function onDropOnSlot(slot, slotId) {
  if (slot.dataset.locked === 'true') return;
  if (!selectedItem) return;

  attempts++;

  if (selectedItem === slotId) {
    handleCorrectMatch(selectedItem, slotId, slot);
  } else {
    handleWrongMatch(slotId, slot);
  }
}

function handleCorrectMatch(itemId, slotId, slotEl) {
  sounds.correct?.();
  matched++;
  roundScore++;

  const item = PERIPHERALS.find(p => p.id === itemId);
  const pCard = document.querySelector(`.em-item--peripheral[data-id="${itemId}"]`);

  if (pCard) {
    pCard.dataset.locked = 'true';
    pCard.classList.remove('is-selected');
    pCard.classList.add('is-matched');
    pCard.setAttribute('aria-label', `${item?.name} – sudah dicocokkan!`);
  }

  slotEl.dataset.locked = 'true';
  slotEl.classList.add('is-matched');
  slotEl.innerHTML = `
    <span class="em-slot__match-icon" aria-hidden="true">✓ ${item?.emoji || ''}</span>
    <span class="em-slot__text em-slot__text--done">${slotEl.querySelector('.em-slot__text')?.textContent || ''}</span>
  `;
  slotEl.setAttribute('aria-label', `Sudah benar! ${item?.name}`);

  selectedItem = null;
  updateProgress();

  if (matched === total) {
    setTimeout(showResult, 600);
  }
}

function handleWrongMatch(slotId, slotEl) {
  sounds.wrong?.();
  document.querySelectorAll('.em-item--peripheral.is-selected').forEach(c => c.classList.remove('is-selected'));
  selectedItem = null;

  slotEl.classList.add('is-wrong');
  setTimeout(() => slotEl.classList.remove('is-wrong'), 700);
}

function updateProgress() {
  const pct = (matched / total) * 100;
  const fill = el('extraMatchProgressFill');
  if (fill) fill.style.width = `${pct}%`;
  const label = el('extraMatchProgressLabel');
  if (label) label.textContent = `${matched} dari ${total} cocok`;
}

function attachDragFrom(dragEl, itemId) {
  let ghostEl, startX, startY;

  function onDown(e) {
    if (dragEl.dataset.locked === 'true') return;
    if (e.button !== undefined && e.button !== 0 && e.pointerType === 'mouse') return;
    e.preventDefault();

    const rect = dragEl.getBoundingClientRect();
    startX = e.clientX;
    startY = e.clientY;

    ghostEl = document.createElement('div');
    ghostEl.className = 'em-drag-ghost';
    ghostEl.style.cssText = `
      position:fixed; pointer-events:none; z-index:2000;
      left:${rect.left}px; top:${rect.top}px;
      width:${rect.width}px; height:${rect.height}px;
      opacity:.85; transform:scale(1.08);
      box-shadow: 0 8px 24px rgba(0,0,0,.2);
    `;
    ghostEl.innerHTML = dragEl.innerHTML;
    document.body.appendChild(ghostEl);
    dragEl.style.opacity = '.4';
    dragEl.setPointerCapture(e.pointerId);

    document.querySelectorAll('.em-item--peripheral.is-selected').forEach(c => c.classList.remove('is-selected'));
    dragEl.classList.add('is-selected');
    selectedItem = itemId;
  }

  function onMove(e) {
    if (!ghostEl) return;
    e.preventDefault();
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    const rect = dragEl.getBoundingClientRect();
    ghostEl.style.left = `${rect.left + dx}px`;
    ghostEl.style.top  = `${rect.top  + dy}px`;

    document.querySelectorAll('.em-slot:not([data-locked="true"])').forEach(s => s.classList.remove('is-hover'));
    const target = getHoveredSlot(e.clientX, e.clientY);
    if (target) target.classList.add('is-hover');
  }

  function onUp(e) {
    if (!ghostEl) return;
    ghostEl.remove(); ghostEl = null;
    dragEl.style.opacity = '';
    document.querySelectorAll('.em-slot').forEach(s => s.classList.remove('is-hover'));

    const target = getHoveredSlot(e.clientX, e.clientY);
    if (target && target.dataset.locked !== 'true') {
      onDropOnSlot(target, target.dataset.id);
    } else {
      dragEl.classList.remove('is-selected');
      selectedItem = null;
    }
  }

  dragEl.addEventListener('pointerdown',   onDown);
  dragEl.addEventListener('pointermove',   onMove);
  dragEl.addEventListener('pointerup',     onUp);
  dragEl.addEventListener('pointercancel', onUp);
}

function attachDropTarget(slotEl, slotId) {
  slotEl.addEventListener('pointermove', (e) => {
    if (slotEl.dataset.locked === 'true') return;
    if (selectedItem) slotEl.classList.add('is-hover');
  });
  slotEl.addEventListener('pointerleave', () => slotEl.classList.remove('is-hover'));
}

function getHoveredSlot(cx, cy) {
  const slots = document.querySelectorAll('.em-slot:not([data-locked="true"])');
  for (const s of slots) {
    const r = s.getBoundingClientRect();
    if (cx >= r.left && cx <= r.right && cy >= r.top && cy <= r.bottom) return s;
  }
  return null;
}

function showResult() {
  launchConfetti(4000);
  sounds.success?.();

  storage.setExtraMatchBest(roundScore);
  storage.setExtraMatchDone(true);
  unlockBadge('extra_match_done');

  el('gamePanel').style.display   = 'none';
  el('resultPanel').style.display = 'block';

  el('extraMatchScore').textContent   = `${roundScore}/${total}`;
  el('extraMatchAttempts').textContent = attempts;

  let msg = '';
  if (attempts <= total)         msg = 'Luar biasa! Kamu sangat teliti! 🌟';
  else if (attempts <= total * 2) msg = 'Bagus! Kamu belajar dengan cepat! 👍';
  else                            msg = 'Jangan menyerah! Coba lagi! 💪';
  el('extraMatchMessage').textContent = msg;
}

document.addEventListener('DOMContentLoaded', () => {
  if (storage.isExtraMatchDone()) {
    const best = storage.getExtraMatchBest();
    if (best !== null) {
      const bestEl = el('extraMatchBestBadge');
      if (bestEl) bestEl.innerHTML = `<span class="badge badge--success">🏅 Terbaik: ${best}/${PERIPHERALS.length}</span>`;
    }
  }

  init();

  el('btnExtraRestart').addEventListener('click', init);
  el('btnExtraRestartResult').addEventListener('click', init);
});
