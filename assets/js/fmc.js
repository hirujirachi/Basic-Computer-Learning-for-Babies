/**
 * fmc.js — Fix My Computer main screen
 */
import { storage } from './storage.js';
import { launchConfetti } from './confetti.js';
import { sounds } from './sound.js';

const PARTS = ['keyboard','mouse','monitor','pc'];

function checkVictory() {
  return PARTS.every(p => storage.getFmcItem(p));
}

function renderStatus() {
  const count = storage.countFmcDone();
  const el = document.getElementById('fmcProgressLabel');
  if (el) el.textContent = `${count} dari 4 sudah diperbaiki`;

  const bar = document.getElementById('fmcProgressFill');
  if (bar) bar.style.width = `${(count / 4) * 100}%`;

  PARTS.forEach(part => {
    const card = document.getElementById(`fmc-part-${part}`);
    if (!card) return;
    const done = storage.getFmcItem(part);
    card.classList.toggle('is-repaired', done);

    const statusEl = card.querySelector('.fmc-part__status');
    if (statusEl) statusEl.textContent = done ? '✓ Sudah diperbaiki!' : 'Ketuk untuk memperbaiki';

    // Check badge
    let badge = card.querySelector('.fmc-part__check');
    if (done && !badge) {
      badge = document.createElement('span');
      badge.className = 'fmc-part__check';
      badge.setAttribute('aria-label', 'Sudah diperbaiki');
      badge.innerHTML = `<svg viewBox="0 0 16 16" aria-hidden="true"><polyline points="3,8 7,12 13,4" stroke="white" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
      card.appendChild(badge);
    } else if (!done && badge) {
      badge.remove();
    }
  });
}

function showVictory() {
  const panel = document.getElementById('victoryPanel');
  const game  = document.getElementById('fmcGame');
  if (panel) panel.style.display = 'block';
  if (game)  game.style.display  = 'none';
  launchConfetti(5000);
  sounds.success?.();
}

document.addEventListener('DOMContentLoaded', () => {
  renderStatus();

  if (checkVictory()) {
    showVictory();
  }

  document.getElementById('btnPlayAgain')?.addEventListener('click', () => {
    PARTS.forEach(p => storage.setFmcItem(p, false));
    storage.setFmcDone(false);
    document.getElementById('victoryPanel').style.display = 'none';
    document.getElementById('fmcGame').style.display = 'block';
    renderStatus();
  });
});
