/**
 * learn.js — Mengenal Komputer 5-step course logic
 */
import { storage } from './storage.js';
import { launchConfetti } from './confetti.js';
import { sounds } from './sound.js';

const TOTAL_STEPS = 5;

// Step data
const steps = [
  {
    title: 'Apa Itu Komputer?',
    desc: 'Komputer adalah mesin pintar yang bisa membantu kita belajar, menulis, dan bermain!',
    color: '#4ECDC4',
    illustrationId: 'illus-full-computer',
  },
  {
    title: 'Monitor',
    desc: 'Monitor adalah layar komputer. Di sinilah kita bisa melihat semua gambar dan tulisan!',
    color: '#3498DB',
    illustrationId: 'illus-monitor',
  },
  {
    title: 'Keyboard',
    desc: 'Keyboard adalah papan ketik. Kita pakai jari kita untuk mengetik huruf dan angka!',
    color: '#FF6B35',
    illustrationId: 'illus-keyboard',
  },
  {
    title: 'Mouse',
    desc: 'Mouse adalah alat yang kita geser di meja untuk menunjuk dan mengklik di layar!',
    color: '#9B59B6',
    illustrationId: 'illus-mouse',
  },
  {
    title: 'PC',
    desc: "PC adalah kotak yang di dalamnya terdapat komponen penting yang membuat komputer bisa bekerja, seperti CPU atau 'otak' komputer!",
    color: '#E74C3C',
    illustrationId: 'illus-pc',
  },
];

// SVG illustrations (inline, consistent flat style)
const illustrations = {
  'illus-full-computer': `
    <svg viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg" aria-label="Ilustrasi komputer lengkap">
      <!-- Monitor -->
      <rect x="40" y="20" width="140" height="100" rx="10" fill="#4ECDC4"/>
      <rect x="50" y="30" width="120" height="80" rx="6" fill="#E8F8F7"/>
      <line x1="40" y1="130" x2="180" y2="130" stroke="#3ABDB5" stroke-width="3"/>
      <!-- Monitor stand -->
      <rect x="98" y="130" width="24" height="16" rx="3" fill="#3ABDB5"/>
      <rect x="82" y="146" width="56" height="8" rx="4" fill="#2E9E96"/>
      <!-- Screen content: graph -->
      <rect x="62" y="42" width="12" height="40" rx="3" fill="#FF6B35" opacity=".7"/>
      <rect x="82" y="52" width="12" height="30" rx="3" fill="#FFE66D" opacity=".8"/>
      <rect x="102" y="38" width="12" height="44" rx="3" fill="#2ECC71" opacity=".8"/>
      <rect x="122" y="58" width="12" height="24" rx="3" fill="#9B59B6" opacity=".7"/>
      <rect x="142" y="47" width="12" height="35" rx="3" fill="#E74C3C" opacity=".7"/>
      <!-- Keyboard -->
      <rect x="22" y="168" width="130" height="36" rx="8" fill="#FFE66D"/>
      <rect x="30" y="175" width="14" height="10" rx="3" fill="#fff" opacity=".8"/>
      <rect x="50" y="175" width="14" height="10" rx="3" fill="#fff" opacity=".8"/>
      <rect x="70" y="175" width="14" height="10" rx="3" fill="#fff" opacity=".8"/>
      <rect x="90" y="175" width="14" height="10" rx="3" fill="#fff" opacity=".8"/>
      <rect x="110" y="175" width="14" height="10" rx="3" fill="#fff" opacity=".8"/>
      <rect x="40" y="190" width="70" height="8" rx="3" fill="#fff" opacity=".6"/>
      <!-- Mouse -->
      <ellipse cx="192" cy="186" rx="18" ry="24" fill="#9B59B6"/>
      <line x1="192" y1="165" x2="192" y2="208" stroke="#E8D5F5" stroke-width="1.5"/>
      <ellipse cx="192" cy="186" rx="18" ry="24" fill="none" stroke="#7D3C98" stroke-width="2"/>
      <!-- PC case -->
      <rect x="168" y="156" width="40" height="52" rx="6" fill="#E74C3C"/>
      <circle cx="188" cy="168" r="5" fill="#FF6B35"/>
      <rect x="174" y="178" width="28" height="4" rx="2" fill="#C0392B"/>
      <rect x="174" y="186" width="28" height="4" rx="2" fill="#C0392B"/>
      <rect x="174" y="194" width="20" height="4" rx="2" fill="#C0392B"/>
    </svg>`,

  'illus-monitor': `
    <svg viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg" aria-label="Ilustrasi monitor">
      <!-- Frame -->
      <rect x="20" y="30" width="180" height="130" rx="14" fill="#3498DB"/>
      <rect x="34" y="44" width="152" height="102" rx="8" fill="#EAF4FB"/>
      <!-- Screen elements -->
      <rect x="44" y="54" width="60" height="12" rx="4" fill="#3498DB" opacity=".4"/>
      <rect x="44" y="72" width="132" height="8" rx="3" fill="#BDC3C7" opacity=".6"/>
      <rect x="44" y="86" width="100" height="8" rx="3" fill="#BDC3C7" opacity=".5"/>
      <rect x="44" y="100" width="120" height="8" rx="3" fill="#BDC3C7" opacity=".5"/>
      <rect x="44" y="114" width="80" height="8" rx="3" fill="#BDC3C7" opacity=".4"/>
      <circle cx="156" cy="77" r="22" fill="#FFE66D" opacity=".8"/>
      <text x="156" y="84" text-anchor="middle" font-size="20" font-family="sans-serif">😊</text>
      <!-- Base -->
      <rect x="94" y="160" width="32" height="22" rx="4" fill="#2980B9"/>
      <rect x="72" y="182" width="76" height="12" rx="6" fill="#1A6E9E"/>
      <!-- Power light -->
      <circle cx="192" cy="148" r="5" fill="#2ECC71"/>
      <!-- Cable -->
      <path d="M 110 182 Q 110 210 160 210" stroke="#95A5A6" stroke-width="3" fill="none" stroke-linecap="round"/>
    </svg>`,

  'illus-keyboard': `
    <svg viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg" aria-label="Ilustrasi keyboard">
      <!-- Main body -->
      <rect x="10" y="60" width="200" height="110" rx="14" fill="#FF6B35"/>
      <!-- Key rows -->
      <!-- Row 1 -->
      <rect x="20" y="72" width="22" height="18" rx="5" fill="white" opacity=".9"/>
      <rect x="48" y="72" width="22" height="18" rx="5" fill="white" opacity=".9"/>
      <rect x="76" y="72" width="22" height="18" rx="5" fill="white" opacity=".9"/>
      <rect x="104" y="72" width="22" height="18" rx="5" fill="white" opacity=".9"/>
      <rect x="132" y="72" width="22" height="18" rx="5" fill="white" opacity=".9"/>
      <rect x="160" y="72" width="30" height="18" rx="5" fill="white" opacity=".9"/>
      <!-- Row 2 -->
      <rect x="20" y="97" width="30" height="18" rx="5" fill="white" opacity=".9"/>
      <rect x="56" y="97" width="22" height="18" rx="5" fill="white" opacity=".9"/>
      <rect x="84" y="97" width="22" height="18" rx="5" fill="white" opacity=".9"/>
      <rect x="112" y="97" width="22" height="18" rx="5" fill="white" opacity=".9"/>
      <rect x="140" y="97" width="22" height="18" rx="5" fill="white" opacity=".9"/>
      <rect x="168" y="97" width="22" height="18" rx="5" fill="white" opacity=".9"/>
      <!-- Row 3 -->
      <rect x="20" y="122" width="22" height="18" rx="5" fill="#FFE66D"/>
      <rect x="48" y="122" width="22" height="18" rx="5" fill="white" opacity=".9"/>
      <rect x="76" y="122" width="22" height="18" rx="5" fill="white" opacity=".9"/>
      <rect x="104" y="122" width="22" height="18" rx="5" fill="white" opacity=".9"/>
      <rect x="132" y="122" width="22" height="18" rx="5" fill="white" opacity=".9"/>
      <rect x="160" y="122" width="30" height="18" rx="5" fill="#FFE66D"/>
      <!-- Spacebar -->
      <rect x="58" y="147" width="104" height="18" rx="5" fill="white" opacity=".95"/>
      <!-- Key labels (small) -->
      <text x="31" y="85" text-anchor="middle" font-size="8" font-weight="bold" fill="#FF6B35" font-family="sans-serif">Q</text>
      <text x="59" y="85" text-anchor="middle" font-size="8" font-weight="bold" fill="#FF6B35" font-family="sans-serif">W</text>
      <text x="87" y="85" text-anchor="middle" font-size="8" font-weight="bold" fill="#FF6B35" font-family="sans-serif">E</text>
      <text x="115" y="85" text-anchor="middle" font-size="8" font-weight="bold" fill="#FF6B35" font-family="sans-serif">R</text>
      <text x="143" y="85" text-anchor="middle" font-size="8" font-weight="bold" fill="#FF6B35" font-family="sans-serif">T</text>
      <!-- Decorative fingers -->
      <ellipse cx="66" cy="195" rx="12" ry="20" fill="#FFD5B8" transform="rotate(-10 66 195)"/>
      <ellipse cx="90" cy="192" rx="12" ry="22" fill="#FFD5B8" transform="rotate(-3 90 192)"/>
      <ellipse cx="114" cy="192" rx="12" ry="22" fill="#FFD5B8" transform="rotate(3 114 192)"/>
      <ellipse cx="138" cy="192" rx="12" ry="22" fill="#FFD5B8" transform="rotate(8 138 192)"/>
    </svg>`,

  'illus-mouse': `
    <svg viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg" aria-label="Ilustrasi mouse komputer">
      <!-- Mouse body -->
      <ellipse cx="110" cy="130" rx="58" ry="78" fill="#9B59B6"/>
      <!-- Button divider -->
      <line x1="110" y1="68" x2="110" y2="140" stroke="#E8D5F5" stroke-width="3"/>
      <!-- Left button highlight -->
      <ellipse cx="88" cy="105" rx="30" ry="28" fill="#A569BD" opacity=".5" clip-path="url(#leftClip)"/>
      <defs>
        <clipPath id="leftClip">
          <rect x="52" y="68" width="58" height="80"/>
        </clipPath>
        <clipPath id="rightClip">
          <rect x="110" y="68" width="58" height="80"/>
        </clipPath>
      </defs>
      <!-- Right button highlight -->
      <ellipse cx="132" cy="105" rx="30" ry="28" fill="#8E44AD" opacity=".3" clip-path="url(#rightClip)"/>
      <!-- Scroll wheel -->
      <rect x="102" y="88" width="16" height="28" rx="8" fill="#E8D5F5"/>
      <!-- Outline -->
      <ellipse cx="110" cy="130" rx="58" ry="78" fill="none" stroke="#7D3C98" stroke-width="3"/>
      <!-- Cable -->
      <path d="M 110 52 Q 110 20 155 15" stroke="#7D3C98" stroke-width="4" fill="none" stroke-linecap="round"/>
      <!-- Shine -->
      <ellipse cx="85" cy="90" rx="8" ry="12" fill="white" opacity=".2" transform="rotate(-15 85 90)"/>
      <!-- Shadow under -->
      <ellipse cx="110" cy="210" rx="45" ry="8" fill="#7D3C98" opacity=".2"/>
    </svg>`,

  'illus-pc': `
    <svg viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg" aria-label="Ilustrasi PC atau casing komputer">
      <!-- Main case body -->
      <rect x="40" y="20" width="120" height="180" rx="14" fill="#E74C3C"/>
      <!-- Front panel detail -->
      <rect x="52" y="36" width="96" height="140" rx="8" fill="#C0392B"/>
      <!-- Power button -->
      <circle cx="100" cy="52" r="14" fill="#E74C3C"/>
      <circle cx="100" cy="52" r="10" fill="#FF6B35"/>
      <text x="100" y="57" text-anchor="middle" font-size="10" fill="white" font-family="sans-serif">⏻</text>
      <!-- Power LED -->
      <circle cx="124" cy="52" r="5" fill="#2ECC71"/>
      <!-- Drive bays -->
      <rect x="58" y="74" width="84" height="18" rx="5" fill="#E74C3C"/>
      <rect x="58" y="98" width="84" height="18" rx="5" fill="#E74C3C"/>
      <!-- Drive bay detail -->
      <line x1="66" y1="83" x2="122" y2="83" stroke="#C0392B" stroke-width="1.5"/>
      <circle cx="128" cy="83" r="3" fill="#C0392B"/>
      <line x1="66" y1="107" x2="122" y2="107" stroke="#C0392B" stroke-width="1.5"/>
      <circle cx="128" cy="107" r="3" fill="#C0392B"/>
      <!-- USB ports -->
      <rect x="62" y="125" width="12" height="8" rx="2" fill="#95A5A6"/>
      <rect x="80" y="125" width="12" height="8" rx="2" fill="#95A5A6"/>
      <!-- Ventilation grill -->
      <line x1="60" y1="145" x2="140" y2="145" stroke="#A93226" stroke-width="2"/>
      <line x1="60" y1="152" x2="140" y2="152" stroke="#A93226" stroke-width="2"/>
      <line x1="60" y1="159" x2="140" y2="159" stroke="#A93226" stroke-width="2"/>
      <!-- Brain icon inside (CPU) -->
      <circle cx="100" cy="195" r="0" fill="none"/> 
      <!-- Base / feet -->
      <rect x="50" y="197" width="24" height="8" rx="4" fill="#922B21"/>
      <rect x="126" y="197" width="24" height="8" rx="4" fill="#922B21"/>
      <!-- Side label -->
      <text x="100" y="178" text-anchor="middle" font-size="11" fill="#E74C3C" font-weight="bold" font-family="sans-serif">CPU</text>
      <text x="100" y="192" text-anchor="middle" font-size="9" fill="#C0392B" font-family="sans-serif">otak komputer</text>
    </svg>`,
};

let currentStep = 0;
let isCompleted = false;
let stepContainer;
let cleanupKeyboard;

function init() {
  currentStep  = storage.getLearnStep();
  isCompleted  = storage.isLearnDone();
  stepContainer = document.getElementById('stepContainer');

  if (isCompleted) {
    showCompletion();
    return;
  }

  renderStep(currentStep, 'none');
  setupKeyboard();
}

function renderProgress(step) {
  const pct = ((step) / TOTAL_STEPS) * 100;
  const bar = document.getElementById('progressFill');
  const label = document.getElementById('progressLabel');
  const dots = document.querySelectorAll('.step-dot');

  if (bar) bar.style.width = `${pct}%`;
  if (label) label.textContent = `Langkah ${step + 1} dari ${TOTAL_STEPS}`;

  dots.forEach((dot, i) => {
    dot.classList.remove('is-active', 'is-done');
    if (i < step)  dot.classList.add('is-done');
    if (i === step) dot.classList.add('is-active');
  });
}

function renderStep(step, direction = 'forward') {
  const data = steps[step];
  const illus = illustrations[data.illustrationId] || '';

  renderProgress(step);

  const prevBtn  = step > 0 ? `<button class="btn btn--ghost" id="btnPrev">← Sebelumnya</button>` : `<span></span>`;
  const isLast   = step === TOTAL_STEPS - 1;
  const nextBtn  = isLast
    ? `<button class="btn btn--success" id="btnFinish">Selesai ✓</button>`
    : `<button class="btn btn--primary" id="btnNext">Selanjutnya →</button>`;

  const animClass = direction === 'back' ? 'step-card--entering-back' : 'step-card--entering';

  stepContainer.innerHTML = `
    <div class="step-card ${animClass}" role="region" aria-label="Langkah ${step + 1}: ${data.title}">
      <div class="step-illustration" aria-hidden="true">
        ${illus}
      </div>
      <div class="step-number-badge" aria-hidden="true">${step + 1}</div>
      <h2 class="step-title">${data.title}</h2>
      <p class="step-desc">${data.desc}</p>
      <div class="step-nav">
        ${prevBtn}
        ${nextBtn}
      </div>
    </div>
  `;

  document.getElementById('btnPrev')?.addEventListener('click', goBack);
  document.getElementById('btnNext')?.addEventListener('click', goNext);
  document.getElementById('btnFinish')?.addEventListener('click', finish);
}

function goNext() {
  if (currentStep < TOTAL_STEPS - 1) {
    sounds.advance?.();
    currentStep++;
    storage.setLearnStep(currentStep);
    renderStep(currentStep, 'forward');
  }
}

function goBack() {
  if (currentStep > 0) {
    sounds.click?.();
    currentStep--;
    storage.setLearnStep(currentStep);
    renderStep(currentStep, 'back');
  }
}

function finish() {
  storage.setLearnDone(true);
  storage.setLearnStep(TOTAL_STEPS - 1);
  isCompleted = true;
  sounds.success?.();
  launchConfetti(4000);
  showCompletion();
}

function showCompletion() {
  const bar = document.getElementById('progressFill');
  if (bar) bar.style.width = '100%';
  const label = document.getElementById('progressLabel');
  if (label) label.textContent = `Langkah ${TOTAL_STEPS} dari ${TOTAL_STEPS}`;
  document.querySelectorAll('.step-dot').forEach(d => { d.classList.remove('is-active'); d.classList.add('is-done'); });

  stepContainer.innerHTML = `
    <div class="completion-screen">
      <span class="completion-screen__trophy" aria-hidden="true">🏆</span>
      <h2 class="completion-screen__title">Hebat! Kamu sudah selesai!</h2>
      <p class="completion-screen__sub">Kamu sudah mengenal semua bagian komputer. Sekarang waktunya bermain! 🎉</p>
      <div class="btn-group">
        <a href="games.php" class="btn btn--primary">🎮 Ke Kuis &amp; Permainan</a>
        <a href="index.php" class="btn btn--ghost">🏠 Kembali ke Beranda</a>
      </div>
      <button class="btn-restart" id="btnRestart">↺ Mulai ulang pelajaran</button>
    </div>
  `;

  document.getElementById('btnRestart')?.addEventListener('click', restart);
}

function restart() {
  currentStep = 0;
  isCompleted = false;
  storage.setLearnStep(0);
  storage.setLearnDone(false);
  sounds.click?.();
  renderStep(0, 'forward');
}

function setupKeyboard() {
  function onKey(e) {
    if (isCompleted) return;
    if (e.key === 'ArrowRight') goNext();
    if (e.key === 'ArrowLeft')  goBack();
  }
  document.addEventListener('keydown', onKey);
  cleanupKeyboard = () => document.removeEventListener('keydown', onKey);
}

// Auto-init
document.addEventListener('DOMContentLoaded', init);
window.addEventListener('beforeunload', () => cleanupKeyboard?.());
