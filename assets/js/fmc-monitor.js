/**
 * fmc-monitor.js — FMC Monitor repair scene
 * Step 1: Drag cracked screen out to removal zone
 * Step 2: Drag new screen into the empty slot
 */
import { storage } from './storage.js';
import { sounds } from './sound.js';
import { launchConfetti } from './confetti.js';

let crackedRemoved = false;
let newInstalled   = false;

function el(id) { return document.getElementById(id); }

function init() {
  if (storage.getFmcItem('monitor')) {
    showSuccess(false);
    return;
  }

  el('step1').style.display = 'flex';
  el('step2').style.display = 'none';

  // Step 1: drag cracked screen to removal zone
  attachRemoveDrag(el('crackedScreen'));
}

function attachRemoveDrag(dragEl) {
  let startX, startY, ghostEl;

  function onDown(e) {
    if (e.button !== undefined && e.button !== 0 && e.pointerType === 'mouse') return;
    e.preventDefault();
    const rect = dragEl.getBoundingClientRect();
    startX = e.clientX;
    startY = e.clientY;

    ghostEl = document.createElement('div');
    ghostEl.className = 'monitor-cracked-screen';
    ghostEl.style.cssText = `
      position:fixed; pointer-events:none; z-index:2000;
      left:${rect.left}px; top:${rect.top}px;
      width:${rect.width}px; height:${rect.height}px;
      opacity:.8; transform:scale(1.04);
      box-shadow:0 8px 24px rgba(0,0,0,.2);
    `;
    ghostEl.innerHTML = dragEl.innerHTML;
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

    const removeZone = el('removeZone');
    if (removeZone) {
      const hit = isOverElement(ghostEl, removeZone);
      removeZone.classList.toggle('is-hover', hit);
    }
  }

  function onUp(e) {
    if (!ghostEl) return;
    ghostEl.remove(); ghostEl = null;
    dragEl.style.opacity = '';
    el('removeZone')?.classList.remove('is-hover');

    const removeZone = el('removeZone');
    const rz = removeZone?.getBoundingClientRect();

    if (rz && e.clientX >= rz.left && e.clientX <= rz.right && e.clientY >= rz.top && e.clientY <= rz.bottom) {
      // Success: cracked screen removed
      sounds.correct?.();
      crackedRemoved = true;

      // Visual: hide cracked screen
      dragEl.style.opacity = '0';
      dragEl.style.transition = 'opacity .4s ease';
      dragEl.style.pointerEvents = 'none';

      // Brief delay then show step 2
      setTimeout(() => {
        el('step1').style.display = 'none';
        el('step2').style.display = 'flex';
        // Update step badge
        const badge2 = document.getElementById('stepBadge2');
        if (badge2) {
          badge2.style.background = 'var(--color-primary)';
          badge2.style.color = 'white';
        }
        attachInstallDrag(el('newScreen'));
      }, 500);
    }
  }

  dragEl.addEventListener('pointerdown',  onDown);
  dragEl.addEventListener('pointermove',  onMove);
  dragEl.addEventListener('pointerup',    onUp);
  dragEl.addEventListener('pointercancel', onUp);
}

function attachInstallDrag(dragEl) {
  let startX, startY, ghostEl;

  function onDown(e) {
    if (e.button !== undefined && e.button !== 0 && e.pointerType === 'mouse') return;
    e.preventDefault();
    const rect = dragEl.getBoundingClientRect();
    startX = e.clientX;
    startY = e.clientY;

    ghostEl = document.createElement('div');
    ghostEl.className = 'monitor-new-screen';
    ghostEl.style.cssText = `
      position:fixed; pointer-events:none; z-index:2000;
      left:${rect.left}px; top:${rect.top}px;
      width:${rect.width}px; height:${rect.height}px;
      opacity:.85; transform:scale(1.04);
      box-shadow:0 8px 24px rgba(0,0,0,.18);
    `;
    ghostEl.innerHTML = dragEl.innerHTML;
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

    const slot = el('monitorSlotNew');
    if (slot) slot.classList.toggle('is-hover', isOverElement(ghostEl, slot));
  }

  function onUp(e) {
    if (!ghostEl) return;
    ghostEl.remove(); ghostEl = null;
    dragEl.style.opacity = '';
    el('monitorSlotNew')?.classList.remove('is-hover');

    const slot = el('monitorSlotNew');
    if (!slot || !crackedRemoved) return;

    const sr = slot.getBoundingClientRect();
    if (e.clientX >= sr.left && e.clientX <= sr.right && e.clientY >= sr.top && e.clientY <= sr.bottom) {
      // Success: new screen installed!
      sounds.success?.();
      newInstalled = true;
      dragEl.style.opacity = '.4';
      dragEl.style.pointerEvents = 'none';

      slot.classList.add('is-filled');
      slot.innerHTML = `
        <span style="font-size:var(--font-size-sm);font-weight:700;color:var(--color-success-dark);text-align:center">
          ✓ Layar baru terpasang!<br>
          <span style="font-size:40px;display:block;margin-top:8px">😊</span>
        </span>
      `;

      setTimeout(() => onMonitorComplete(), 500);
    }
  }

  dragEl.addEventListener('pointerdown',  onDown);
  dragEl.addEventListener('pointermove',  onMove);
  dragEl.addEventListener('pointerup',    onUp);
  dragEl.addEventListener('pointercancel', onUp);
}

function isOverElement(movingEl, targetEl) {
  const mr = movingEl.getBoundingClientRect();
  const tr = targetEl.getBoundingClientRect();
  const overlapX = Math.max(0, Math.min(mr.right,  tr.right)  - Math.max(mr.left, tr.left));
  const overlapY = Math.max(0, Math.min(mr.bottom, tr.bottom) - Math.max(mr.top,  tr.top));
  return overlapX * overlapY > 100;
}

function onMonitorComplete() {
  storage.setFmcItem('monitor', true);
  const count = storage.countFmcDone();
  if (count === 4) storage.setFmcDone(true);
  launchConfetti(3500);
  showSuccess(true);
}

function showSuccess(animate) {
  el('repairWrapper').style.display = 'none';
  const done = el('successPanel');
  done.style.display = 'flex';
  if (animate) done.style.animation = 'fadeIn .4s ease both';
}

document.addEventListener('DOMContentLoaded', init);
