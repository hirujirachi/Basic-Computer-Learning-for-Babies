/**
 * fmc-pc.js — FMC PC Cable repair scene
 * Drag cable plugs to correct ports, with visual stretching cable (SVG path)
 */
import { storage } from './storage.js';
import { sounds } from './sound.js';
import { launchConfetti } from './confetti.js';

const CABLES = ['monitor', 'keyboard', 'mouse'];
let connectedCables = new Set();

function el(id) { return document.getElementById(id); }

// SVG cable line drawn while dragging
let activeCableSvg = null;

function getPortEl(cableId) {
  return document.querySelector(`.pc-port[data-cable="${cableId}"]`);
}

function getPlugEl(cableId) {
  return document.querySelector(`.cable-plug[data-cable="${cableId}"]`);
}

function init() {
  if (storage.getFmcItem('pc')) {
    showSuccess(false);
    return;
  }

  CABLES.forEach(cableId => {
    const plug = getPlugEl(cableId);
    if (plug) attachPlugDrag(plug, cableId);
  });
}

function attachPlugDrag(plugEl, cableId) {
  let startX, startY, ghostEl, svgLine;

  function getPlugCenter() {
    const r = plugEl.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  }

  function onDown(e) {
    if (plugEl.dataset.locked === 'true') return;
    if (e.button !== undefined && e.button !== 0 && e.pointerType === 'mouse') return;
    e.preventDefault();

    const rect = plugEl.getBoundingClientRect();
    startX = e.clientX;
    startY = e.clientY;

    // Ghost plug
    ghostEl = document.createElement('div');
    ghostEl.className = `cable-plug cable-plug--${cableId}`;
    ghostEl.style.cssText = `
      position:fixed; pointer-events:none; z-index:2000;
      left:${rect.left}px; top:${rect.top}px;
      width:${rect.width}px; height:${rect.height}px;
      opacity:.9; transform:scale(1.1);
      box-shadow:0 6px 16px rgba(0,0,0,.2);
    `;
    ghostEl.textContent = plugEl.textContent;
    document.body.appendChild(ghostEl);

    // SVG line (stretching cable)
    const svgNS = 'http://www.w3.org/2000/svg';
    svgLine = document.createElementNS(svgNS, 'svg');
    svgLine.style.cssText = 'position:fixed;inset:0;width:100vw;height:100vh;pointer-events:none;z-index:1999;overflow:visible';

    const path = document.createElementNS(svgNS, 'path');
    const color = { monitor: '#3498DB', keyboard: '#FF6B35', mouse: '#9B59B6' }[cableId] || '#888';
    path.setAttribute('stroke', color);
    path.setAttribute('stroke-width', '4');
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke-linecap', 'round');
    path.id = `cablePath_${cableId}`;

    svgLine.appendChild(path);
    document.body.appendChild(svgLine);

    plugEl.style.opacity = '.35';
    plugEl.setPointerCapture(e.pointerId);

    updateCablePath(e.clientX, e.clientY, path);
  }

  function onMove(e) {
    if (!ghostEl) return;
    e.preventDefault();

    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    const rect = plugEl.getBoundingClientRect();
    ghostEl.style.left = `${rect.left + dx}px`;
    ghostEl.style.top  = `${rect.top  + dy}px`;

    // Update cable path
    const path = svgLine?.querySelector(`#cablePath_${cableId}`);
    if (path) updateCablePath(e.clientX, e.clientY, path);

    // Hover states on ports
    document.querySelectorAll('.pc-port:not(.is-filled)').forEach(p => p.classList.remove('is-hover'));
    const target = getHoveredPort(e.clientX, e.clientY);
    if (target) target.classList.add('is-hover');
  }

  function updateCablePath(mx, my, path) {
    const anchor = getPlugCenter();
    const ax = anchor.x;
    const ay = anchor.y;

    // Bezier curve: anchor point → current mouse position
    const cx1 = ax + (mx - ax) * 0.3;
    const cy1 = ay + 60;
    const cx2 = mx - (mx - ax) * 0.3;
    const cy2 = my - 30;

    path.setAttribute('d', `M ${ax} ${ay} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${mx} ${my}`);
  }

  function onUp(e) {
    if (!ghostEl) return;

    ghostEl.remove(); ghostEl = null;
    svgLine?.remove(); svgLine = null;
    plugEl.style.opacity = '';

    document.querySelectorAll('.pc-port').forEach(p => p.classList.remove('is-hover'));

    const target = getHoveredPort(e.clientX, e.clientY);
    if (!target) return;

    const targetCable = target.dataset.cable;

    if (cableId === targetCable) {
      // Correct port
      sounds.correct?.();
      target.classList.add('is-filled');
      const portIcon = { monitor: '🖥️', keyboard: '⌨️', mouse: '🖱️' }[cableId];
      target.innerHTML = `
        <span style="font-size:20px">${portIcon}</span>
        <span>✓ Terhubung!</span>
      `;

      plugEl.dataset.locked = 'true';
      plugEl.style.opacity  = '.4';
      plugEl.style.cursor   = 'default';

      // Draw permanent cable (static SVG line)
      drawPermanentCable(cableId);

      connectedCables.add(cableId);
      if (connectedCables.size === CABLES.length) {
        setTimeout(() => onPcComplete(), 500);
      }
    } else {
      // Wrong port
      sounds.wrong?.();
      target.classList.add('is-wrong');
      setTimeout(() => target.classList.remove('is-wrong'), 700);
    }
  }

  plugEl.addEventListener('pointerdown',  onDown);
  plugEl.addEventListener('pointermove',  onMove);
  plugEl.addEventListener('pointerup',    onUp);
  plugEl.addEventListener('pointercancel', onUp);
}

function drawPermanentCable(cableId) {
  const plug   = getPlugEl(cableId);
  const port   = getPortEl(cableId);
  if (!plug || !port) return;

  const pr = plug.getBoundingClientRect();
  const tr = port.getBoundingClientRect();

  const ax = pr.left + pr.width / 2;
  const ay = pr.top  + pr.height / 2;
  const bx = tr.left + tr.width / 2;
  const by = tr.top  + tr.height / 2;

  const svgNS = 'http://www.w3.org/2000/svg';
  const svg   = document.createElementNS(svgNS, 'svg');
  svg.style.cssText = 'position:fixed;inset:0;width:100vw;height:100vh;pointer-events:none;z-index:50;overflow:visible';

  const path = document.createElementNS(svgNS, 'path');
  const color = { monitor: '#3498DB', keyboard: '#FF6B35', mouse: '#9B59B6' }[cableId] || '#888';

  const cx1 = ax + (bx - ax) * 0.3;
  const cy1 = ay + 60;
  const cx2 = bx - (bx - ax) * 0.3;
  const cy2 = by - 20;

  path.setAttribute('d',            `M ${ax} ${ay} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${bx} ${by}`);
  path.setAttribute('stroke',       color);
  path.setAttribute('stroke-width', '4');
  path.setAttribute('fill',         'none');
  path.setAttribute('stroke-linecap', 'round');
  path.setAttribute('opacity',      '0.75');

  svg.appendChild(path);
  document.body.appendChild(svg);
  // Keep it; will be removed on page unload
}

function getHoveredPort(cx, cy) {
  const ports = document.querySelectorAll('.pc-port:not(.is-filled)');
  for (const p of ports) {
    const r = p.getBoundingClientRect();
    if (cx >= r.left && cx <= r.right && cy >= r.top && cy <= r.bottom) return p;
  }
  return null;
}

function onPcComplete() {
  storage.setFmcItem('pc', true);
  const count = storage.countFmcDone();
  if (count === 4) storage.setFmcDone(true);
  sounds.success?.();
  launchConfetti(3500);
  showSuccess(true);
}

function showSuccess(animate) {
  el('repairArea').style.display = 'none';
  // Remove all floating SVG cables
  document.querySelectorAll('svg[style*="pointer-events:none"]').forEach(s => s.remove());
  const done = el('successPanel');
  done.style.display = 'flex';
  if (animate) done.style.animation = 'fadeIn .4s ease both';
}

document.addEventListener('DOMContentLoaded', init);
