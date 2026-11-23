import { storage } from './storage.js';
import { unlockBadge } from './narration-badges.js';
import { sounds } from './sound.js';
import { launchConfetti } from './confetti.js';

const GAME_DURATION = 30; // seconds
const TARGET_TIMEOUT = 1800; // ms before auto-dismiss
const TARGET_SIZE_MIN = 44;
const TARGET_SIZE_MAX = 72;

const TARGET_COLORS = [
  '#FF6B35','#4ECDC4','#9B59B6','#E74C3C','#2ECC71','#3498DB','#F39C12'
];

let score        = 0;
let timeLeft     = GAME_DURATION;
let gameActive   = false;
let countdownId  = null;
let targetTimeoutId = null;
let currentTarget   = null;

const playground  = () => document.getElementById('mousePlayground');
const scoreEl     = () => document.getElementById('mouseScore');
const timerEl     = () => document.getElementById('mouseTimer');
const timerStat   = () => document.getElementById('mouseTimerStat');
const resultPanel = () => document.getElementById('mouseResult');
const gamePanel   = () => document.getElementById('mouseGame');
const idleMsg     = () => document.getElementById('mouseIdle');

function getTargetSize() {
  return Math.round(Math.random() * (TARGET_SIZE_MAX - TARGET_SIZE_MIN) + TARGET_SIZE_MIN);
}

function spawnTarget() {
  clearTargetTimeout();
  removeTarget();

  const pg   = playground();
  if (!pg || !gameActive) return;

  const size  = getTargetSize();
  const pRect = pg.getBoundingClientRect();
  const pgW   = pg.clientWidth;
  const pgH   = pg.clientHeight;

  const halfSize = size / 2;
  const margin   = halfSize + 6;

  const x = Math.random() * (pgW - margin * 2) + margin;
  const y = Math.random() * (pgH - margin * 2) + margin;

  const color = TARGET_COLORS[Math.floor(Math.random() * TARGET_COLORS.length)];
  const size2 = size * 0.55;

  const target = document.createElement('button');
  target.className = 'mouse-target';
  target.style.cssText = `
    width: ${size}px; height: ${size}px;
    left: ${x}px; top: ${y}px;
    background: ${color};
  `;
  target.setAttribute('aria-label', 'Klik target ini!');
  target.type = 'button';

  target.addEventListener('pointerdown', onTargetClick);

  pg.appendChild(target);
  currentTarget = target;

  targetTimeoutId = setTimeout(() => {
    if (currentTarget === target) {
      removeTarget();
      if (gameActive) spawnTarget();
    }
  }, TARGET_TIMEOUT);
}

function onTargetClick(e) {
  e.preventDefault();
  if (!gameActive || !currentTarget) return;

  sounds.pop?.();
  score++;
  updateScore();

  currentTarget.classList.add('is-popping');
  clearTargetTimeout();
  setTimeout(() => {
    removeTarget();
    if (gameActive) spawnTarget();
  }, 180);
}

function removeTarget() {
  if (currentTarget) {
    currentTarget.removeEventListener('pointerdown', onTargetClick);
    currentTarget.remove();
    currentTarget = null;
  }
}

function clearTargetTimeout() {
  if (targetTimeoutId) { clearTimeout(targetTimeoutId); targetTimeoutId = null; }
}

function clearCountdown() {
  if (countdownId) { clearInterval(countdownId); countdownId = null; }
}

function updateScore() {
  const el = scoreEl();
  if (el) el.textContent = score;
}

function updateTimer() {
  const el = timerEl();
  if (el) el.textContent = timeLeft;
  const stat = timerStat();
  if (stat) {
    stat.classList.toggle('is-urgent', timeLeft <= 5);
  }
  const bar = document.getElementById('mouseProgressFill');
  if (bar) bar.style.width = `${(timeLeft / GAME_DURATION) * 100}%`;
}

function startGame() {
  score     = 0;
  timeLeft  = GAME_DURATION;
  gameActive = true;

  updateScore();
  updateTimer();

  const idle = idleMsg();
  if (idle) idle.style.display = 'none';

  const pg = playground();
  if (pg) pg.classList.remove('mouse-playground--inactive');

  spawnTarget();

  countdownId = setInterval(() => {
    timeLeft--;
    updateTimer();
    if (timeLeft <= 0) endGame();
  }, 1000);
}

function endGame() {
  gameActive = false;
  clearCountdown();
  clearTargetTimeout();
  removeTarget();

  const pg = playground();
  if (pg) pg.classList.add('mouse-playground--inactive');

  const best = storage.getMouseBest();
  const isNew = best === null || score > best;
  if (isNew) storage.setMouseBest(score);
  unlockBadge('match_played');

  // Show result
  const rPanel = resultPanel();
  const gPanel = gamePanel();
  if (gPanel) gPanel.style.display = 'none';
  if (rPanel) {
    rPanel.style.display = 'block';

    document.getElementById('resultScore').textContent = score;
    document.getElementById('resultBest').textContent =
      `🏆 Skor Terbaik: ${storage.getMouseBest()}`;

    let msg = '';
    if (score >= 20)      msg = 'Luar biasa! Kamu sangat cepat! 🚀';
    else if (score >= 10) msg = 'Bagus! Terus berlatih! 👍';
    else                   msg = 'Jangan menyerah, coba lagi! 💪';
    document.getElementById('resultMessage').textContent = msg;

    if (isNew && score > 0) launchConfetti(3000);
  }
}

function resetGame() {
  gameActive = false;
  clearCountdown();
  clearTargetTimeout();
  removeTarget();

  score    = 0;
  timeLeft = GAME_DURATION;
  updateScore();
  updateTimer();

  const rPanel = resultPanel();
  const gPanel = gamePanel();
  if (rPanel) rPanel.style.display = 'none';
  if (gPanel) gPanel.style.display = 'block';

  const pg = playground();
  if (pg) {
    pg.classList.add('mouse-playground--inactive');
    const idle = idleMsg();
    if (idle) idle.style.display = 'flex';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('btnStart').addEventListener('click', () => {
    if (!gameActive) startGame();
  });

  document.getElementById('btnRestart').addEventListener('click', () => {
    resetGame();
    setTimeout(startGame, 100);
  });

  document.getElementById('btnRestartResult').addEventListener('click', () => {
    resetGame();
    setTimeout(startGame, 100);
  });

  // Cleanup on page hide
  window.addEventListener('pagehide', () => {
    clearCountdown();
    clearTargetTimeout();
  });
});
