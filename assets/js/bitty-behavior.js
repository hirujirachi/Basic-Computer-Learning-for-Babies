/**
 * bitty-behavior.js — Expressions, animations, idle timers, reactions for Bitty.
 *
 * Usage:
 *   import { BittyBehavior } from './bitty-behavior.js';
 *
 *   const behavior = new BittyBehavior(containerEl, getEquippedFn);
 *   behavior.greet();
 *   behavior.celebrate();
 *   behavior.react('earn_coins');
 *   behavior.destroy(); // cleanup timers
 *
 * The class manages its own idle timers and cleans them on destroy().
 * It responds to window CustomEvents 'bc:changed' and 'bitty:reaction'.
 */

import { renderBitty } from './bitty-renderer.js';
import { Rewards } from './rewards.js';

const REDUCE = matchMedia('(prefers-reduced-motion: reduce)').matches;

// Idle timing constants
const IDLE_BLINK_MIN = 8000;   // ms
const IDLE_BLINK_MAX = 15000;
const IDLE_YAWN_CHANCE = 0.25; // 25% chance of yawn instead of blink after 12s idle

export class BittyBehavior {
  /**
   * @param {HTMLElement} container   – the element that holds the Bitty SVG
   * @param {function}    getEquipped – returns the current equipped object
   * @param {object}      options
   *   size: 'sm'|'md'|'lg'
   *   showBubble: boolean – whether to show speech bubbles
   *   bubbleEl: HTMLElement (optional, will create if not provided)
   */
  constructor(container, getEquipped, options = {}) {
    this.container   = container;
    this.getEquipped = getEquipped;
    this.size        = options.size || 'md';
    this.showBubble  = options.showBubble !== false;

    // Create or find bubble element
    if (options.bubbleEl) {
      this.bubbleEl = options.bubbleEl;
    } else if (this.showBubble) {
      this.bubbleEl = document.createElement('div');
      this.bubbleEl.className = 'bitty-bubble';
      this.bubbleEl.setAttribute('role', 'status');
      this.bubbleEl.setAttribute('aria-live', 'polite');
      this.bubbleEl.hidden = true;
      // Insert inside container so it positions relative to it
      container.appendChild(this.bubbleEl);
    }

    this._currentExpression = 'neutral';
    this._idleTimer = null;
    this._bubbleTimer = null;
    this._animTimer = null;
    this._destroyed = false;

    // Listen to global events
    this._onBcChanged = (e) => {
      if (e.detail.delta > 0) this.react('earn_coins');
    };
    this._onReaction = (e) => {
      this.react(e.detail.type, e.detail);
    };

    window.addEventListener('bc:changed', this._onBcChanged);
    window.addEventListener('bitty:reaction', this._onReaction);

    // Initial render
    this._render('neutral');
    this._scheduleIdle();
  }

  // ---- Public methods ----

  greet() {
    this._show('happy', 'Halo! Aku Bitty! 👋', 3500);
    if (!REDUCE) this._animate('bounce');
  }

  celebrate() {
    this._show('happy', 'Yeay! Kamu hebat! 🎉', 3000);
    if (!REDUCE) this._animate('celebrate');
  }

  react(type, detail = {}) {
    switch (type) {
      case 'earn_coins':
        this._show('happy', `+${detail.amount || ''} Byte Coin! 🪙`, 2500);
        if (!REDUCE) this._animate('bounce');
        break;
      case 'purchase':
        this._show('surprised', 'Wah! Aksesori baru! 😲✨', 3000);
        if (!REDUCE) this._animate('celebrate');
        // After surprise, switch to happy
        this._animTimer = setTimeout(() => {
          if (!this._destroyed) this._render('happy');
        }, 1200);
        break;
      case 'insufficient_coins':
        this._show('sad', 'Koinmu belum cukup, yuk kumpulkan lagi! 😢', 3000);
        this._render('sad');
        // Return to neutral after a moment
        setTimeout(() => { if (!this._destroyed) this._render('neutral'); }, 2500);
        break;
      case 'click':
        // Rotate between blink and smile
        if (this._currentExpression === 'blink') {
          this._render('happy');
          setTimeout(() => { if (!this._destroyed) this._render('neutral'); }, 1000);
        } else {
          this._render('blink');
          setTimeout(() => { if (!this._destroyed) this._render('neutral'); }, 600);
        }
        break;
      default:
        break;
    }
  }

  setExpression(expression) {
    this._render(expression);
  }

  showBubbleMessage(text, duration = 3000) {
    this._showBubble(text, duration);
  }

  destroy() {
    this._destroyed = true;
    clearTimeout(this._idleTimer);
    clearTimeout(this._bubbleTimer);
    clearTimeout(this._animTimer);
    window.removeEventListener('bc:changed', this._onBcChanged);
    window.removeEventListener('bitty:reaction', this._onReaction);
  }

  // ---- Private helpers ----

  _render(expression) {
    if (this._destroyed) return;
    this._currentExpression = expression;
    renderBitty(this.container, {
      expression,
      equipped: this.getEquipped(),
      size: this.size,
    });
    // Re-attach click handler
    const svg = this.container.querySelector('.bitty-svg');
    if (svg) {
      svg.style.cursor = 'pointer';
      svg.setAttribute('tabindex', '0');
      svg.setAttribute('role', 'button');
      svg.setAttribute('aria-label', 'Klik Bitty!');
      svg.onclick = () => this.react('click');
      svg.onkeydown = (e) => { if (e.key === 'Enter' || e.key === ' ') this.react('click'); };
    }
    // Reset idle timer on any state change
    this._scheduleIdle();
  }

  _show(expression, text, duration) {
    this._render(expression);
    if (this.showBubble) this._showBubble(text, duration);
  }

  _showBubble(text, duration) {
    if (!this.bubbleEl) return;
    clearTimeout(this._bubbleTimer);
    this.bubbleEl.textContent = text;
    this.bubbleEl.hidden = false;
    this.bubbleEl.classList.remove('bitty-bubble--hide');
    this._bubbleTimer = setTimeout(() => {
      if (this.bubbleEl) {
        this.bubbleEl.classList.add('bitty-bubble--hide');
        setTimeout(() => {
          if (this.bubbleEl) this.bubbleEl.hidden = true;
        }, 300);
      }
    }, duration);
  }

  _animate(type) {
    if (REDUCE) return;
    const svg = this.container.querySelector('.bitty-svg');
    if (!svg) return;
    svg.classList.remove('bitty-anim--bounce', 'bitty-anim--celebrate', 'bitty-anim--shake');
    // Trigger reflow to restart animation
    void svg.offsetWidth;
    switch (type) {
      case 'bounce':
        svg.classList.add('bitty-anim--bounce');
        break;
      case 'celebrate':
        svg.classList.add('bitty-anim--celebrate');
        break;
      case 'shake':
        svg.classList.add('bitty-anim--shake');
        break;
    }
    // Clean up class after animation
    clearTimeout(this._animTimer);
    this._animTimer = setTimeout(() => {
      if (!this._destroyed) {
        svg.classList.remove('bitty-anim--bounce', 'bitty-anim--celebrate', 'bitty-anim--shake');
      }
    }, 1000);
  }

  _scheduleIdle() {
    if (this._destroyed) return;
    clearTimeout(this._idleTimer);
    const delay = IDLE_BLINK_MIN + Math.random() * (IDLE_BLINK_MAX - IDLE_BLINK_MIN);
    this._idleTimer = setTimeout(() => {
      if (this._destroyed) return;
      // Decide: blink or yawn
      const doYawn = Math.random() < IDLE_YAWN_CHANCE;
      if (doYawn) {
        this._render('yawn');
        setTimeout(() => {
          if (!this._destroyed) {
            this._render('neutral');
            this._scheduleIdle();
          }
        }, 1800);
      } else {
        this._render('blink');
        setTimeout(() => {
          if (!this._destroyed) {
            this._render('neutral');
            this._scheduleIdle();
          }
        }, 400);
      }
    }, delay);
  }
}

/**
 * initBittyWidget — creates a managed Bitty widget in a container,
 * subscribing to bc:changed and bitty:reaction events automatically.
 *
 * @param {HTMLElement} wrapperEl  – container for Bitty + bubble
 * @param {object}      options    – { size, showBubble, greeting }
 * @returns {BittyBehavior}
 */
export function initBittyWidget(wrapperEl, options = {}) {
  if (!wrapperEl) return null;

  // Ensure inner container for SVG
  let bittyContainer = wrapperEl.querySelector('.bitty-container');
  if (!bittyContainer) {
    bittyContainer = document.createElement('div');
    bittyContainer.className = 'bitty-container';
    wrapperEl.appendChild(bittyContainer);
  }

  const getEquipped = () => {
    const state = Rewards.getState();
    return state.equipped || {};
  };

  const behavior = new BittyBehavior(bittyContainer, getEquipped, {
    size: options.size || 'md',
    showBubble: options.showBubble !== false,
  });

  if (options.greeting !== false) {
    setTimeout(() => behavior.greet(), 400);
  }

  return behavior;
}
