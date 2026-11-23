/**
 * drag.js — Pointer Events drag-and-drop helper
 * Works with mouse, touch, and pen.
 * 
 * Usage:
 *   makeDraggable(el, { onStart, onMove, onEnd })
 *   makeDraggable returns a cleanup function.
 * 
 *   hitTest(el, targets) — returns first target element that overlaps with el.
 *   snapTo(el, target) — positions el centered over target.
 *   returnToOrigin(el, originalPos) — smoothly returns el to original position.
 */

/**
 * Make an element draggable using Pointer Events.
 * The element is moved by CSS transform.
 * Returns a cleanup function.
 */
export function makeDraggable(el, { onStart, onMove, onEnd, constrain } = {}) {
  let startX, startY, originX, originY;
  let active = false;

  function pointerDown(e) {
    if (e.button !== undefined && e.button !== 0 && e.pointerType === 'mouse') return;
    if (el.dataset.locked === 'true') return;

    e.preventDefault();
    active = true;

    // Get current translate values
    const style = window.getComputedStyle(el);
    const matrix = new DOMMatrix(style.transform);
    originX = matrix.m41;
    originY = matrix.m42;

    startX = e.clientX - originX;
    startY = e.clientY - originY;

    el.setPointerCapture(e.pointerId);
    el.classList.add('drag-item--dragging');
    el.style.zIndex = '1000';
    el.style.transition = 'none';

    onStart?.({ el, event: e, originX, originY });
  }

  function pointerMove(e) {
    if (!active) return;
    e.preventDefault();

    let dx = e.clientX - startX;
    let dy = e.clientY - startY;

    if (constrain) {
      const c = constrain(el, dx, dy);
      dx = c.x; dy = c.y;
    }

    el.style.transform = `translate(${dx}px, ${dy}px)`;
    onMove?.({ el, event: e, x: dx, y: dy });
  }

  function pointerUp(e) {
    if (!active) return;
    active = false;
    el.classList.remove('drag-item--dragging');
    el.style.zIndex = '';

    onEnd?.({ el, event: e });
  }

  el.addEventListener('pointerdown', pointerDown);
  el.addEventListener('pointermove', pointerMove);
  el.addEventListener('pointerup', pointerUp);
  el.addEventListener('pointercancel', pointerUp);

  return () => {
    el.removeEventListener('pointerdown', pointerDown);
    el.removeEventListener('pointermove', pointerMove);
    el.removeEventListener('pointerup', pointerUp);
    el.removeEventListener('pointercancel', pointerUp);
  };
}

/**
 * Hit-test: check if `dragEl` overlaps with any of the `targets`.
 * Returns the best-overlapping target element, or null.
 */
export function hitTest(dragEl, targets) {
  const dragRect = dragEl.getBoundingClientRect();
  let best = null;
  let bestArea = 0;

  for (const target of targets) {
    const tr = target.getBoundingClientRect();
    const overlapX = Math.max(0, Math.min(dragRect.right, tr.right)   - Math.max(dragRect.left, tr.left));
    const overlapY = Math.max(0, Math.min(dragRect.bottom, tr.bottom) - Math.max(dragRect.top,  tr.top));
    const area = overlapX * overlapY;
    if (area > bestArea) {
      bestArea = area;
      best = target;
    }
  }
  return best;
}

/**
 * Smoothly return element to its original transform (0,0).
 */
export function returnToOrigin(el, { duration = 350 } = {}) {
  el.style.transition = `transform ${duration}ms cubic-bezier(.34,1.56,.64,1)`;
  el.style.transform  = 'translate(0, 0)';
  setTimeout(() => { el.style.transition = ''; }, duration + 50);
}

/**
 * Snap element visually to a target.
 * Sets transform so el appears centered on target.
 */
export function snapTo(el, target) {
  const elRect  = el.getBoundingClientRect();
  const tgRect  = target.getBoundingClientRect();

  // Current translate
  const style  = window.getComputedStyle(el);
  const matrix = new DOMMatrix(style.transform);

  const centerX = tgRect.left + tgRect.width / 2;
  const centerY = tgRect.top + tgRect.height / 2;
  const elCenterX = elRect.left + elRect.width / 2;
  const elCenterY = elRect.top + elRect.height / 2;

  const newX = matrix.m41 + (centerX - elCenterX);
  const newY = matrix.m42 + (centerY - elCenterY);

  el.style.transition = 'transform 200ms cubic-bezier(.34,1.56,.64,1)';
  el.style.transform  = `translate(${newX}px, ${newY}px)`;
  setTimeout(() => { el.style.transition = ''; }, 260);
}

/**
 * Confetti burst at a point
 */
export function confettiBurst(x, y) {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:9999';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  const colors = ['#FF6B35','#4ECDC4','#FFE66D','#2ECC71','#9B59B6','#E74C3C'];
  const particles = Array.from({length: 60}, () => ({
    x, y,
    vx: (Math.random() - .5) * 10,
    vy: Math.random() * -12 - 2,
    color: colors[Math.floor(Math.random() * colors.length)],
    r: Math.random() * 6 + 3,
    alpha: 1,
    rot: Math.random() * Math.PI * 2,
    rspeed: (Math.random() - .5) * .3,
  }));

  let frame;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.vy += .4;
      p.alpha -= .018; p.rot += p.rspeed;
      if (p.alpha <= 0) return;
      alive = true;
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillRect(-p.r, -p.r/2, p.r*2, p.r);
      ctx.restore();
    });
    if (alive) frame = requestAnimationFrame(draw);
    else { canvas.remove(); }
  }
  frame = requestAnimationFrame(draw);
  return () => { cancelAnimationFrame(frame); canvas.remove(); };
}
