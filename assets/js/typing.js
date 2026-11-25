import { sounds } from './sound.js';
import { launchConfetti } from './confetti.js';
import { unlockBadge } from './narration-badges.js';
import { Rewards } from './rewards.js';

const WORD_POOL = [
  'kucing','buku','komputer','mouse','layar',
  'monitor','belajar','sekolah','bermain','tombol',
  'keyboard','jendela','pintu','meja','kursi'
];

const WORDS_PER_ROUND = 5;

let wordList     = [];
let wordIndex    = 0;
let roundActive  = false;
let startTime    = 0;
let totalCorrect = 0;
let totalTyped   = 0;

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getWordList() {
  return shuffle(WORD_POOL).slice(0, WORDS_PER_ROUND);
}

function el(id) { return document.getElementById(id); }

function init() {
  wordList    = getWordList();
  wordIndex   = 0;
  roundActive = true;
  startTime   = Date.now();
  totalCorrect = 0;
  totalTyped  = 0;

  el('gamePanel').style.display    = 'block';
  el('resultPanel').style.display  = 'none';

  loadWord(0);

  const input = el('typingInput');
  input.value = '';
  input.disabled = false;
  input.focus();
}

function loadWord(index) {
  wordIndex = index;
  const word = wordList[index];

  // Update progress
  el('wordProgress').innerHTML = `Kata <span>${index + 1} dari ${WORDS_PER_ROUND}</span>`;
  const pct = (index / WORDS_PER_ROUND) * 100;
  el('wordProgressFill').style.width = `${pct}%`;

  // Render character spans
  const guideEl = el('guideWord');
  guideEl.innerHTML = '';
  [...word].forEach((ch, i) => {
    const span = document.createElement('span');
    span.className = `char char--pending${i === 0 ? ' char--cursor' : ''}`;
    span.dataset.char = ch;
    span.dataset.index = i;
    span.textContent = ch;
    guideEl.appendChild(span);
  });

  // Clear input
  const input = el('typingInput');
  input.value = '';
  input.classList.remove('is-correct');

  updateAccuracy();
}

function handleInput(e) {
  if (!roundActive) return;

  // Block paste — restore to value before paste
  if (e.inputType === 'insertFromPaste' || e.inputType === 'insertFromPasteAsQuotation') {
    // Paste is blocked via the 'paste' event listener below; ignore here
    return;
  }

  // Block composition events (IME)
  if (e.isComposing) return;

  const typed = e.target.value;
  const word  = wordList[wordIndex];

  renderCharColors(typed, word);
  updateAccuracy();

  // Check if fully correct
  if (typed === word) {
    sounds.correct?.();
    el('typingInput').classList.add('is-correct');
    totalCorrect += word.length;
    totalTyped   += typed.length;

    setTimeout(() => {
      if (wordIndex + 1 < WORDS_PER_ROUND) {
        loadWord(wordIndex + 1);
        sounds.advance?.();
      } else {
        endRound();
      }
    }, 350);
  } else {
    totalTyped = 0; // will recalculate at end
  }
}

function renderCharColors(typed, word) {
  const spans = el('guideWord').querySelectorAll('.char:not(.char--extra)');
  const extraContainer = el('guideWord');

  // Remove old extra chars
  extraContainer.querySelectorAll('.char--extra').forEach(e => e.remove());

  spans.forEach((span, i) => {
    span.classList.remove('char--pending','char--correct','char--wrong','char--cursor');
    if (i < typed.length) {
      span.classList.add(typed[i] === word[i] ? 'char--correct' : 'char--wrong');
    } else if (i === typed.length) {
      span.classList.add('char--pending','char--cursor');
    } else {
      span.classList.add('char--pending');
    }
  });

  // Show extra characters (typed beyond word length)
  if (typed.length > word.length) {
    for (let i = word.length; i < typed.length; i++) {
      const span = document.createElement('span');
      span.className = 'char char--extra';
      span.textContent = typed[i];
      extraContainer.appendChild(span);
    }
  }
}

function updateAccuracy() {
  // Count correct chars in current input
  const typed = el('typingInput').value;
  const word  = wordList[wordIndex] || '';
  let correct = 0;
  let total   = typed.length;

  [...typed].forEach((ch, i) => {
    if (i < word.length && ch === word[i]) correct++;
  });

  const acc = total > 0 ? Math.round((correct / total) * 100) : 100;
  const accEl = el('accuracyValue');
  if (accEl) accEl.textContent = `${acc}%`;
  const accBar = el('accuracyFill');
  if (accBar) accBar.style.width = `${acc}%`;
}

function endRound() {
  roundActive = false;
  const elapsed = (Date.now() - startTime) / 1000;

  el('gamePanel').style.display   = 'none';
  el('resultPanel').style.display = 'block';

  // Accuracy: count correct chars across all words typed
  let correctChars = 0;
  let totalChars   = 0;
  wordList.forEach(word => {
    totalChars   += word.length;
    correctChars += word.length; // all words must be completed correctly to advance
  });
  const accuracy = 100; // since we only advance on correct words

  const wpm = Math.round((WORDS_PER_ROUND / elapsed) * 60);

  el('resultAccuracy').textContent = `${accuracy}%`;
  el('resultWords').textContent    = `${WORDS_PER_ROUND}/${WORDS_PER_ROUND}`;
  el('resultTime').textContent     = `${elapsed.toFixed(1)}s`;

  launchConfetti(3500);
  sounds.success?.();
  unlockBadge('typing_played');

  // Claim Byte Coin reward
  const result = Rewards.claim('typing_complete');
  const rewardArea = el('typingRewardArea');
  if (rewardArea) {
    if (result.granted) {
      rewardArea.innerHTML = `<div class="reward-notification"><span class="reward-notification__icon">🪙</span> Kamu mendapat +${result.amount} Byte Coin!</div>`;
    } else if (result.alreadyClaimed) {
      rewardArea.innerHTML = `<div class="reward-notification reward-notification--muted">Hadiah untuk aktivitas ini sudah kamu terima.</div>`;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  init();

  el('typingInput').addEventListener('input', handleInput);

  // Prevent paste
  el('typingInput').addEventListener('paste', e => e.preventDefault());

  el('btnRestart').addEventListener('click', init);
  el('btnRestartResult').addEventListener('click', init);
});
