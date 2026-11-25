import { storage } from './storage.js';
import { showToast } from './modal.js';

const BADGE_KEY = 'badges:v1';

const BADGE_CATALOG = [
  { id: 'first_learn',      emoji: '📚', name: 'Pelajar Pemula',        desc: 'Menyelesaikan pelajaran pertama' },
  { id: 'learn_done',       emoji: '🎓', name: 'Sarjana Komputer',       desc: 'Menyelesaikan semua pelajaran' },
  { id: 'quiz_perfect',     emoji: '🏆', name: 'Juara Kuis',             desc: 'Mendapat nilai sempurna di kuis' },
  { id: 'quiz_played',      emoji: '🎯', name: 'Ikut Kuis',              desc: 'Mencoba kuis pertama kali' },
  { id: 'fmc_first',        emoji: '🔧', name: 'Teknisi Muda',           desc: 'Memperbaiki komputer pertama kali' },
  { id: 'fmc_done',         emoji: '🛠️', name: 'Teknisi Handal',         desc: 'Memperbaiki semua perangkat' },
  { id: 'extra_explored',   emoji: '🔍', name: 'Penjelajah Perangkat',   desc: 'Menjelajahi perangkat tambahan' },
  { id: 'extra_match_done', emoji: '🔌', name: 'Ahli Perangkat',         desc: 'Menyelesaikan permainan perangkat tambahan' },
  { id: 'match_played',     emoji: '🃏', name: 'Pemain Kartu',           desc: 'Memainkan permainan memori' },
  { id: 'typing_played',    emoji: '⌨️', name: 'Juru Ketik',             desc: 'Mencoba latihan mengetik' },
  { id: 'io_sort',          emoji: '⬇️', name: 'Jago Input Output',      desc: 'Menyelesaikan game Input atau Output' },
  { id: 'named_player',     emoji: '🌟', name: 'Punya Nama',             desc: 'Mengatur nama pemain' },
];

function loadBadges() {
  return storage.get(BADGE_KEY, []);
}

function saveBadges(list) {
  storage.set(BADGE_KEY, list);
}

export function unlockBadge(id) {
  const unlocked = loadBadges();
  if (unlocked.includes(id)) return false;
  const def = BADGE_CATALOG.find(b => b.id === id);
  if (!def) return false;
  unlocked.push(id);
  saveBadges(unlocked);
  showToast(`${def.emoji} Lencana baru: "${def.name}"!`, 'success', 3500);
  return true;
}

export function isBadgeUnlocked(id) {
  return loadBadges().includes(id);
}

export function renderBadgeShelf(containerEl) {
  if (!containerEl) return;
  const unlocked = loadBadges();
  containerEl.innerHTML = '';

  BADGE_CATALOG.forEach(def => {
    const isOn = unlocked.includes(def.id);
    const item = document.createElement('div');
    item.className = `badge-shelf__item${isOn ? ' is-unlocked' : ' is-locked'}`;
    item.setAttribute('title', isOn ? def.desc : 'Belum terbuka');
    item.setAttribute('aria-label', `${def.name}: ${isOn ? def.desc : 'Belum terbuka'}`);
    item.innerHTML = `
      <div class="badge-shelf__icon">${isOn ? def.emoji : '🔒'}</div>
      <div class="badge-shelf__label">${def.name}</div>
      ${isOn ? `<div class="badge-shelf__desc">${def.desc}</div>` : ''}
    `;
    containerEl.appendChild(item);
  });
}

export function initNarrationController(containerEl, lines = [], opts = {}) {
  if (!containerEl || !lines.length) return;

  const { onStep } = opts;
  let current = 0;
  let synth = window.speechSynthesis || null;
  let speaking = false;

  function getVoice() {
    if (!synth) return null;
    const voices = synth.getVoices();
    return voices.find(v => v.lang.startsWith('id')) || voices[0] || null;
  }

  function stopSpeech() {
    if (synth && synth.speaking) {
      synth.cancel();
    }
    speaking = false;
    updateReadBtn();
  }

  function speak(text) {
    if (!synth) return;
    stopSpeech();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'id-ID';
    utter.rate = 0.9;
    utter.pitch = 1.1;
    const voice = getVoice();
    if (voice) utter.voice = voice;
    utter.onstart = () => { speaking = true; updateReadBtn(); };
    utter.onend = () => { speaking = false; updateReadBtn(); };
    utter.onerror = () => { speaking = false; updateReadBtn(); };
    synth.speak(utter);
  }

  function updateReadBtn() {
    const btn = containerEl.querySelector('.narration__btn-read');
    if (!btn) return;
    btn.textContent = speaking ? '⏹ Berhenti' : '🔊 Dengarkan';
    btn.setAttribute('aria-label', speaking ? 'Hentikan narasi' : 'Dengarkan narasi');
  }

  function updateNav() {
    const prevBtn = containerEl.querySelector('.narration__btn-prev');
    const nextBtn = containerEl.querySelector('.narration__btn-next');
    const counter = containerEl.querySelector('.narration__counter');
    if (prevBtn) prevBtn.disabled = current === 0;
    if (nextBtn) nextBtn.disabled = current === lines.length - 1;
    if (counter) counter.textContent = `${current + 1} / ${lines.length}`;
  }

  function renderText() {
    const textEl = containerEl.querySelector('.narration__text');
    if (textEl) {
      textEl.style.opacity = '0';
      setTimeout(() => {
        textEl.textContent = lines[current];
        textEl.style.opacity = '1';
      }, 150);
    }
    updateNav();
    onStep?.(current);
  }

  containerEl.innerHTML = `
    <div class="narration-box" role="region" aria-label="Narasi cerita">
      <div class="narration__kiki" aria-hidden="true">
        <img src="assets/svg/mascot-kiki.svg" alt="" width="52" height="58">
      </div>
      <div class="narration__content">
        <p class="narration__text" aria-live="polite">${lines[current]}</p>
        <div class="narration__controls">
          <button class="btn btn--ghost btn--sm narration__btn-prev" aria-label="Cerita sebelumnya">← Sebelumnya</button>
          <span class="narration__counter" aria-live="polite">1 / ${lines.length}</span>
          <button class="btn btn--primary btn--sm narration__btn-next" aria-label="Lanjutkan cerita">Lanjut Cerita →</button>
        </div>
        ${synth ? `<button class="btn btn--ghost btn--sm narration__btn-read" aria-label="Dengarkan narasi">🔊 Dengarkan</button>` : ''}
      </div>
    </div>
  `;

  updateNav();

  containerEl.querySelector('.narration__btn-prev')?.addEventListener('click', () => {
    if (current > 0) { stopSpeech(); current--; renderText(); }
  });

  containerEl.querySelector('.narration__btn-next')?.addEventListener('click', () => {
    if (current < lines.length - 1) { stopSpeech(); current++; renderText(); }
  });

  containerEl.querySelector('.narration__btn-read')?.addEventListener('click', () => {
    if (speaking) { stopSpeech(); } else { speak(lines[current]); }
  });

  if (synth && synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = () => {};
  }

  return {
    goTo(index) {
      if (index >= 0 && index < lines.length) {
        stopSpeech();
        current = index;
        renderText();
      }
    },
    stop: stopSpeech,
  };
}
