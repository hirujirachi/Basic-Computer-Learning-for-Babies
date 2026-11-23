/**
 * fmc-keyboard.js — FMC Keyboard repair scene
 * Drag keycaps to empty key slots, validate by ID
 */
import { storage } from './storage.js';
import { sounds } from './sound.js';
import { launchConfetti } from './confetti.js';

// Keyboard layout: rows of keys
// Some slots are "empty" (need a cap dragged in)
const KEYBOARD_ROWS = [
  [
    { id: 'Q', label: 'Q' }, { id: 'W', label: 'W', empty: true },
    { id: 'E', label: 'E' }, { id: 'R', label: 'R', empty: true },
    { id: 'T', label: 'T' },
  ],
  [
    { id: 'A', label: 'A' }, { id: 'S', label: 'S' },
    { id: 'D', label: 'D', empty: true }, { id: 'F', label: 'F' },
    { id: 'G', label: 'G', empty: true },
  ],
  [
    { id: 'Z', label: 'Z', empty: true }, { id: 'X', label: 'X' },
    { id: 'C', label: 'C' }, { id: 'V', label: 'V', empty: true },
    { id: 'B', label: 'B' },
  ],
];

const EMPTY_SLOTS = KEYBOARD_ROWS.flat().filter(k => k.empty).map(k => k.id);

let filledSlots  = new Set();
let cleanups     = [];

function el(id) { return document.getElementById(id); }

function init() {
  if (storage.getFmcItem('keyboard')) {
    showSuccess(false);
    return;
  }
  renderKeyboard();
  renderSpareCaps();
}

function renderKeyboard() {
  const board = el('keyboardBoard');
  board.innerHTML = '';

  KEYBOARD_ROWS.forEach(row => {
    const rowEl = document.createElement('div');
    rowEl.className = 'keyboard-row';

    row.forEach(key => {
      const slot = document.createElement('div');
      slot.className = `key-slot${key.empty ? '' : ' is-filled'}`;
      slot.dataset.id = key.id;

      if (key.empty) {
        slot.setAttribute('aria-label', `Slot kosong untuk tombol ${key.label}`);
        slot.textContent = '?';
      } else {
        slot.textContent = key.label;
        slot.style.background = 'var(--color-primary)';
        slot.style.color = 'white';
        slot.style.borderStyle = 'solid';
        slot.style.borderColor = 'var(--color-primary-dark)';
        slot.style.boxShadow = '0 3px 0 var(--color-primary-dark)';
      }

      rowEl.appendChild(slot);
    });

    board.appendChild(rowEl);
  });
}

function renderSpareCaps() {
  const spares = el('spareCaps');
  spares.innerHTML = '';

  EMPTY_SLOTS.forEach(id => {
    const cap = document.createElement('div');
    cap.className = 'key-cap';
    cap.dataset.id = id;
    cap.dataset.locked = 'false';
    cap.setAttribute('aria-label', `Tombol ${id}, seret ke slot yang sesuai`);
    cap.setAttribute('role', 'button');
    cap.setAttribute('tabindex', '0');
    cap.textContent = id;
    spares.appendChild(cap);
    attachCapDrag(cap);
  });
}

function attachCapDrag(capEl) {
  let startX, startY, ghostEl;

  function onDown(e) {
    if (capEl.dataset.locked === 'true') return;
    if (e.button !== undefined && e.button !== 0 && e.pointerType === 'mouse') return;
    e.preventDefault();

    const rect = capEl.getBoundingClientRect();
    startX = e.clientX;
    startY = e.clientY;

    ghostEl = capEl.cloneNode(true);
    ghostEl.className = 'key-cap';
    ghostEl.style.cssText = `
      position:fixed; pointer-events:none; z-index:2000;
      left:${rect.left}px; top:${rect.top}px;
      width:${rect.width}px; height:${rect.height}px;
      opacity:.85; transform:scale(1.1);
      box-shadow: 0 8px 20px rgba(0,0,0,.2);
    `;
    document.body.appendChild(ghostEl);
    capEl.style.opacity = '.35';
    capEl.setPointerCapture(e.pointerId);
  }

  function onMove(e) {
    if (!ghostEl) return;
    e.preventDefault();
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    const rect = capEl.getBoundingClientRect();
    ghostEl.style.left = `${rect.left + dx}px`;
    ghostEl.style.top  = `${rect.top  + dy}px`;

    // Hover highlight
    document.querySelectorAll('.key-slot:not(.is-filled)').forEach(s => s.classList.remove('is-hover'));
    const target = getHoveredSlot(e.clientX, e.clientY);
    if (target) target.classList.add('is-hover');
  }

  function onUp(e) {
    if (!ghostEl) return;
    ghostEl.remove(); ghostEl = null;
    capEl.style.opacity = '';
    document.querySelectorAll('.key-slot').forEach(s => s.classList.remove('is-hover'));

    const target = getHoveredSlot(e.clientX, e.clientY);
    if (!target) return;

    const capId    = capEl.dataset.id;
    const slotId   = target.dataset.id;

    if (capId === slotId) {
      // Correct
      sounds.correct?.();
      target.textContent = capId;
      target.classList.add('is-filled');
      target.classList.remove('is-hover');
      target.style.background    = 'var(--color-success)';
      target.style.color         = 'white';
      target.style.borderStyle   = 'solid';
      target.style.borderColor   = 'var(--color-success-dark)';
      target.style.boxShadow     = '0 3px 0 var(--color-success-dark)';
      target.setAttribute('aria-label', `Tombol ${capId} terpasang`);

      capEl.dataset.locked = 'true';
      capEl.style.opacity  = '.4';
      capEl.style.cursor   = 'default';

      filledSlots.add(capId);

      if (filledSlots.size === EMPTY_SLOTS.length) {
        setTimeout(() => onKeyboardComplete(), 400);
      }
    } else {
      // Wrong
      sounds.wrong?.();
      target.classList.add('is-wrong');
      setTimeout(() => target.classList.remove('is-wrong'), 700);
    }
  }

  capEl.addEventListener('pointerdown', onDown);
  capEl.addEventListener('pointermove', onMove);
  capEl.addEventListener('pointerup',   onUp);
  capEl.addEventListener('pointercancel', onUp);

  const cleanup = () => {
    capEl.removeEventListener('pointerdown', onDown);
    capEl.removeEventListener('pointermove', onMove);
    capEl.removeEventListener('pointerup',   onUp);
    capEl.removeEventListener('pointercancel', onUp);
  };
  cleanups.push(cleanup);
}

function getHoveredSlot(cx, cy) {
  const slots = document.querySelectorAll('.key-slot:not(.is-filled)');
  for (const s of slots) {
    const r = s.getBoundingClientRect();
    if (cx >= r.left && cx <= r.right && cy >= r.top && cy <= r.bottom) return s;
  }
  return null;
}

function onKeyboardComplete() {
  storage.setFmcItem('keyboard', true);
  checkAllFmcDone();
  sounds.success?.();
  launchConfetti(3500);
  showSuccess(true);
}

function checkAllFmcDone() {
  const count = storage.countFmcDone();
  if (count === 4) storage.setFmcDone(true);
}

function showSuccess(animate) {
  el('repairArea').style.display = 'none';
  const done = el('successPanel');
  done.style.display = 'flex';
  if (animate) done.style.animation = 'fadeIn .4s ease both';
}

document.addEventListener('DOMContentLoaded', init);
