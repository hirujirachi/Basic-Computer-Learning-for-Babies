/**
 * confetti.js — Full-screen confetti celebration
 * Usage: import { launchConfetti } from './confetti.js'
 *        launchConfetti(); // auto-removes after animation
 */

export function launchConfetti(duration = 3500) {
  const canvas = document.createElement('canvas');
  canvas.className = 'confetti-canvas';
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  const colors = ['#FF6B35','#4ECDC4','#FFE66D','#2ECC71','#9B59B6','#E74C3C','#3498DB'];

  const particles = Array.from({ length: 120 }, () => ({
    x:      Math.random() * canvas.width,
    y:      Math.random() * canvas.height - canvas.height,
    vx:     (Math.random() - .5) * 5,
    vy:     Math.random() * 4 + 2,
    color:  colors[Math.floor(Math.random() * colors.length)],
    w:      Math.random() * 10 + 5,
    h:      Math.random() * 5 + 3,
    rot:    Math.random() * Math.PI * 2,
    rspeed: (Math.random() - .5) * .15,
    swing:  Math.random() * .08,
    swingOffset: Math.random() * Math.PI * 2,
  }));

  const startTime = performance.now();
  let frame;

  function draw(now) {
    const elapsed = now - startTime;
    if (elapsed > duration) {
      canvas.remove();
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const fadeStart = duration * .6;
    const alpha = elapsed > fadeStart
      ? 1 - (elapsed - fadeStart) / (duration - fadeStart)
      : 1;

    particles.forEach(p => {
      p.x  += p.vx + Math.sin(p.swingOffset) * p.swing * 10;
      p.y  += p.vy;
      p.rot += p.rspeed;
      p.swingOffset += p.swing;

      if (p.y > canvas.height) {
        p.y = -p.h;
        p.x = Math.random() * canvas.width;
      }

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle   = p.color;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });

    frame = requestAnimationFrame(draw);
  }

  frame = requestAnimationFrame(draw);

  // Handle resize
  const onResize = () => {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  window.addEventListener('resize', onResize);

  return () => {
    cancelAnimationFrame(frame);
    window.removeEventListener('resize', onResize);
    canvas.remove();
  };
}
