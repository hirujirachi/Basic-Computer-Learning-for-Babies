/**
 * kiki-buddy.js — Kiki melayang di pojok layar: klik untuk fakta lucu,
 * plus percikan bintang tiap klik. Dipasang lewat partials/footer.php.
 */
import { sounds } from './sound.js';

const FACTS = [
  'Komputer pertama di dunia besarnya seperti satu ruang kelas! 🏫',
  'Mouse dinamai mouse karena kabelnya mirip ekor tikus! 🐭',
  'Tombol spasi adalah tombol terbesar di keyboard. Coba cari! ⌨️',
  'Monitor tersusun dari titik kecil bernama piksel. Banyak banget! 🌈',
  'Komputer tidak bisa capek, tapi bisa kepanasan. Makanya ada kipas! 🌬️',
  'Flashdisk kecil, tapi bisa menyimpan ribuan foto! 📸',
  'Printer mengubah gambar di layar menjadi kertas! 🖨️',
  'Kalau komputer error, coba matikan lalu nyalakan lagi ya! 🔄',
  'Sering istirahat dari layar bikin mata Kiki senang! 👀',
];
const ALL = ['⭐', '✨', '💖', '🌈', '🎈'];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

function readName() {
  try { return (JSON.parse(localStorage.getItem('komputerku:playerProfile:v1')) || {}).name || ''; }
  catch { return ''; }
}

function speak(text) {
  if (!('speechSynthesis' in window)) return;
  if (localStorage.getItem('komputerku:sound:muted') === 'true') return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text.replace(/[^\p{L}\p{N}\s.,!?]/gu, ''));
  u.lang = 'id-ID'; u.pitch = 1.5; u.rate = 0.95;
  speechSynthesis.speak(u);
}

function sparkle(x, y) {
  if (reduce) return;
  for (let i = 0; i < 5; i++) {
    const s = document.createElement('span');
    s.className = 'sparkle';
    s.textContent = ALL[Math.floor(Math.random() * ALL.length)];
    s.style.left = x + 'px'; s.style.top = y + 'px';
    s.style.setProperty('--dx', (Math.random() * 80 - 40) + 'px');
    s.style.setProperty('--dy', (-30 - Math.random() * 60) + 'px');
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 900);
  }
}

const root = document.createElement('div');
root.className = 'kiki-buddy';
root.innerHTML = `
  <div class="kiki-buddy__bubble" id="kikiBubble" role="status" aria-live="polite" hidden></div>
  <button class="kiki-buddy__btn" id="kikiBtn" type="button" aria-label="Klik Kiki untuk fakta seru">
    <img src="assets/svg/mascot-kiki.svg" alt="" width="64" height="70">
  </button>`;
document.body.appendChild(root);

const bubble = root.querySelector('#kikiBubble');
const btn = root.querySelector('#kikiBtn');
let hideT, last = -1;

btn.addEventListener('click', () => {
  let i; do { i = Math.floor(Math.random() * FACTS.length); } while (i === last);
  last = i;
  const name = readName();
  const text = (name ? `${name}, tahu nggak? ` : 'Tahu nggak? ') + FACTS[i];
  bubble.textContent = text; bubble.hidden = false;
  btn.classList.remove('is-jump'); void btn.offsetWidth; btn.classList.add('is-jump');
  sounds.pop(); speak(text);
  clearTimeout(hideT); hideT = setTimeout(() => { bubble.hidden = true; }, 7000);
});

// Percikan bintang di mana pun anak mengklik
document.addEventListener('pointerdown', (e) => {
  if (e.target.closest('.kiki-buddy')) return;
  sparkle(e.clientX, e.clientY);
});
