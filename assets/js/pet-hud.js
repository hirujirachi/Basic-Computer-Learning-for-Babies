/**
 * pet-hud.js — BC Coin HUD widget injected into the site header.
 *
 * Creates a coin pill in the .site-header__actions area.
 * Listens to 'bc:changed' events and updates with animation.
 *
 * Usage: imported by header.php's inline module script.
 */

import { Rewards } from './rewards.js';

let hudEl = null;
let countEl = null;
let currentBalance = 0;

export function initPetHUD() {
  // Find the actions area in the header
  const actions = document.querySelector('.site-header__actions');
  if (!actions) return;

  // Create coin pill
  hudEl = document.createElement('div');
  hudEl.className = 'bc-hud';
  hudEl.setAttribute('aria-live', 'polite');
  hudEl.setAttribute('aria-label', 'Byte Coins kamu');
  hudEl.title = 'Byte Coins – mata uang virtual kamu!';
  hudEl.innerHTML = `
    <span class="bc-hud__icon" aria-hidden="true">🪙</span>
    <span class="bc-hud__count" id="bcHudCount">0</span>
    <span class="bc-hud__label sr-only">Byte Coin</span>
  `;

  // Insert before the sound button
  const soundBtn = actions.querySelector('.btn-sound');
  if (soundBtn) {
    actions.insertBefore(hudEl, soundBtn);
  } else {
    actions.prepend(hudEl);
  }

  countEl = document.getElementById('bcHudCount');

  // Load initial balance
  currentBalance = Rewards.getBalance();
  if (countEl) countEl.textContent = currentBalance;

  // Listen for balance changes
  window.addEventListener('bc:changed', onBcChanged);

  // Tamper recovery notification
  window.addEventListener('bc:tamper-recovered', () => {
    import('./modal.js').then(({ showToast }) => {
      showToast('Data tersimpan dipulihkan otomatis.', 'info', 4000);
    });
  });
}

function onBcChanged(e) {
  const { balance, delta } = e.detail;
  const oldBalance = currentBalance;
  currentBalance = balance;

  if (!countEl) return;

  // Count-up animation for gains, instant for spending
  if (delta > 0) {
    animateCountUp(oldBalance, balance);
    // Bump animation
    hudEl?.classList.remove('bc-hud--bump');
    void hudEl?.offsetWidth;
    hudEl?.classList.add('bc-hud--bump');
  } else {
    countEl.textContent = balance;
    hudEl?.classList.remove('bc-hud--bump');
    void hudEl?.offsetWidth;
    hudEl?.classList.add('bc-hud--bump');
  }
}

function animateCountUp(from, to) {
  if (!countEl) return;
  const duration = 600;
  const start = performance.now();
  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const value = Math.round(from + (to - from) * easeOut(progress));
    countEl.textContent = value;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function easeOut(t) {
  return 1 - (1 - t) * (1 - t);
}
