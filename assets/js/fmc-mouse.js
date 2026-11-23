/**
 * fmc-mouse.js — FMC Mouse repair scene
 * Drag left and right mouse buttons to their correct slots
 */
import { storage } from './storage.js';
import { sounds } from './sound.js';
import { launchConfetti } from './confetti.js';

let filledSlots = new Set();

function el(id) { return document.getElementById(id); }

function init() {
  if (storage.getFmcItem('mouse')) {
    showSuccess(false);
    return;
  }
  attachButtonDrag(el('btnPieceLeft'), 'left');
  attachButtonDrag(el('btnPieceRight'), 'right');
}

function attachButtonDrag(dragEl, side) {
  let startX, startY, ghostEl;

  function onDown(e) {
    if (dragEl.dataset.locked === 'true') return;
    if (e.button !== undefined && e.button !== 0 && e.pointerType === 'mouse') return;
    e.preventDefault();

    const rect = dragEl.getBoundingClientRect();
    startX = e.clientX;
    startY = e.clientY;

    ghostEl = document.createElement('div');
    ghostEl.className = `mouse-btn-piece mouse-btn-piece--${side}`;
    ghostEl.style.cssText = `
      position:fixed; pointer-events:none; z-index:2000;
      left:${rect.left}px; top:${rect.top}px;
      width:${rect.width}px; height:${rect.height}px;
      opacity:.85; transform:scale(1.1);
      box-shadow: 0 8px 20px rgba(0,0,0,.2);
    `;
    ghostEl.textContent = dragEl.textContent;
    document.body.appendChild(ghostEl);
    dragEl.style.opacity = '.35';
    dragEl.setPointerCapture(e.pointerId);
  }

  function onMove(e) {
    if (!ghostEl) return;
    e.preventDefault();
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    const rect = dragEl.getBoundingClientRect();
    ghostEl.style.left = `${rect.left + dx}px`;
    ghostEl.style.top  = `${rect.top  + dy}px`;

    // Hover states
    document.querySelectorAll('.mouse-repair-slot:not(.is-filled)').forEach(s => s.classList.remove('is-hover'));
    const target = getHoveredSlot(e.clientX, e.clientY);
    if (target) target.classList.add('is-hover');
  }

  function onUp(e) {
    if (!ghostEl) return;
    ghostEl.remove(); ghostEl = null;
    dragEl.style.opacity = '';
    document.querySelectorAll('.mouse-repair-slot').forEach(s => s.classList.remove('is-hover'));

    const target = getHoveredSlot(e.clientX, e.clientY);
    if (!target) return;

    const targetSide = target.dataset.side;

    if (side === targetSide) {
      // Correct
      sounds.correct?.();
      target.classList.add('is-filled');
      target.innerHTML = `
        <span style="font-size:var(--font-size-xs);font-weight:800;color:var(--color-success-dark)">✓ ${side === 'left' ? 'Kiri' : 'Kanan'}</span>
      `;
      dragEl.dataset.locked = 'true';
      dragEl.style.opacity  = '.4';

      filledSlots.add(side);
      if (filledSlots.size === 2) {
        setTimeout(() => onMouseComplete(), 400);
      }
    } else {
      sounds.wrong?.();
      target.classList.add('is-wrong');
      setTimeout(() => target.classList.remove('is-wrong'), 700);
    }
  }

  dragEl.addEventListener('pointerdown',  onDown);
  dragEl.addEventListener('pointermove',  onMove);
  dragEl.addEventListener('pointerup',    onUp);
  dragEl.addEventListener('pointercancel', onUp);
}

function getHoveredSlot(cx, cy) {
  const slots = document.querySelectorAll('.mouse-repair-slot:not(.is-filled)');
  for (const s of slots) {
    const r = s.getBoundingClientRect();
    if (cx >= r.left && cx <= r.right && cy >= r.top && cy <= r.bottom) return s;
  }
  return null;
}

function onMouseComplete() {
  storage.setFmcItem('mouse', true);
  const count = storage.countFmcDone();
  if (count === 4) storage.setFmcDone(true);
  sounds.success?.();
  launchConfetti(3500);
  showSuccess(true);
}

function showSuccess(animate) {
  el('repairArea').style.display = 'none';
  const done = el('successPanel');
  done.style.display = 'flex';
  if (animate) done.style.animation = 'fadeIn .4s ease both';
}

document.addEventListener('DOMContentLoaded', init);
