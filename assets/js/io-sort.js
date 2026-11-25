import { sounds } from './sound.js';
import { launchConfetti } from './confetti.js';
import { unlockBadge } from './narration-badges.js';
import { storage } from './storage.js';
import { showModal } from './modal.js';

const ITEMS = [
  { e: '⌨️', n: 'Keyboard', t: 'in',  why: 'Keyboard memasukkan huruf ke komputer.' },
  { e: '🖱️', n: 'Mouse',    t: 'in',  why: 'Mouse memasukkan perintah klik.' },
  { e: '📷', n: 'Webcam',   t: 'in',  why: 'Webcam memasukkan gambar wajahmu.' },
  { e: '🎤', n: 'Mikrofon', t: 'in',  why: 'Mikrofon memasukkan suaramu.' },
  { e: '🖥️', n: 'Monitor',  t: 'out', why: 'Monitor mengeluarkan gambar.' },
  { e: '🔊', n: 'Speaker',  t: 'out', why: 'Speaker mengeluarkan suara.' },
  { e: '🖨️', n: 'Printer',  t: 'out', why: 'Printer mengeluarkan kertas cetakan.' },
  { e: '📽️', n: 'Proyektor', t: 'out', why: 'Proyektor mengeluarkan gambar ke dinding.' },
];
const FALL_MS = 7000;
const $ = (id) => document.getElementById(id);
const sky = $('ioSky'), item = $('ioItem');
let queue, idx, score, raf, t0, locked;

function start() {
  queue = [...ITEMS].sort(() => Math.random() - .5);
  idx = 0; score = 0; next();
}

function next() {
  if (idx >= queue.length) return finish();
  const it = queue[idx];
  item.className = 'io__item'; item.textContent = it.e; item.style.top = '0px';
  $('ioName').textContent = it.n;
  $('ioRound').textContent = `Benda ${idx + 1} dari ${queue.length}`;
  $('ioScore').textContent = `⭐ ${score}`;
  locked = false; t0 = performance.now();
  cancelAnimationFrame(raf);
  const maxTop = () => sky.clientHeight - item.offsetHeight;
  const tick = (now) => {
    const p = Math.min((now - t0) / FALL_MS, 1);
    item.style.top = p * maxTop() + 'px';
    if (p < 1 && !locked) raf = requestAnimationFrame(tick);
    else if (!locked) answer(null);
  };
  raf = requestAnimationFrame(tick);
}

function answer(choice) {
  if (locked) return;
  locked = true; cancelAnimationFrame(raf);
  const it = queue[idx], ok = choice === it.t;
  if (ok) { score++; sounds.correct(); } else sounds.wrong();
  item.classList.add(ok ? 'is-ok' : 'is-bad');
  const label = it.t === 'in' ? 'INPUT' : 'OUTPUT';
  $('ioFeedback').textContent = (ok ? '🎉 Benar! ' : `Ups! ${it.n} itu ${label}. `) + it.why;
  $('ioScore').textContent = `⭐ ${score}`;
  idx++; setTimeout(next, 1800);
}

function finish() {
  const best = storage.get('io-sort:best', 0);
  if (score > best) storage.set('io-sort:best', score);
  unlockBadge('io_sort');
  if (score >= 6) { launchConfetti(); sounds.success(); }
  const msg = score === queue.length ? 'Sempurna! Kamu jago Input & Output!' : score >= 5 ? 'Hebat! Sedikit lagi sempurna.' : 'Ayo coba lagi, pasti bisa!';
  showModal({
    icon: score >= 5 ? '🏆' : '💪', title: `Skor kamu ${score}/${queue.length}`, body: msg,
    actions: [{ label: 'Main Lagi', onClick: start }, { label: 'Menu Game', variant: 'ghost', onClick: () => { location.href = 'games.php'; } }],
  });
}

$('btnIn').addEventListener('click', () => answer('in'));
$('btnOut').addEventListener('click', () => answer('out'));
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') answer('in');
  if (e.key === 'ArrowRight') answer('out');
});
start();
