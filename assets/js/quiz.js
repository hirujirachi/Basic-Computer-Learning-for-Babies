/**
 * quiz.js — Kuis Mengenal Komputer
 * 5 specified questions with exact content
 */
import { storage } from './storage.js';
import { sounds } from './sound.js';
import { launchConfetti } from './confetti.js';

// Quiz data — questions in fixed order, answers in fixed order
const questions = [
  {
    text: "Bagian komputer yang berfungsi sebagai LAYAR untuk melihat gambar adalah...",
    options: [
      { label: 'A', text: 'Keyboard' },
      { label: 'B', text: 'Mouse' },
      { label: 'C', text: 'Monitor' },
      { label: 'D', text: 'CPU' },
    ],
    correct: 2, // index 2 = C. Monitor
  },
  {
    text: "Alat yang kita geser di meja untuk menunjuk di layar disebut...",
    options: [
      { label: 'A', text: 'Keyboard' },
      { label: 'B', text: 'Mouse' },
      { label: 'C', text: 'Monitor' },
      { label: 'D', text: 'CPU' },
    ],
    correct: 1, // B. Mouse
  },
  {
    text: "Papan ketik yang kita pakai untuk mengetik huruf disebut...",
    options: [
      { label: 'A', text: 'Keyboard' },
      { label: 'B', text: 'Mouse' },
      { label: 'C', text: 'Monitor' },
      { label: 'D', text: 'CPU' },
    ],
    correct: 0, // A. Keyboard
  },
  {
    text: "Tombol apa yang kita tekan untuk menyalakan komputer?",
    options: [
      { label: 'A', text: 'Enter' },
      { label: 'B', text: 'Delete' },
      { label: 'C', text: 'Power' },
      { label: 'D', text: 'Space' },
    ],
    correct: 2, // C. Power
  },
  {
    text: "Otak atau pusat komputer yang ada di dalam kotak PC disebut...",
    options: [
      { label: 'A', text: 'Keyboard' },
      { label: 'B', text: 'Mouse' },
      { label: 'C', text: 'Monitor' },
      { label: 'D', text: 'CPU' },
    ],
    correct: 3, // D. CPU
  },
];

let currentQ  = 0;
let answered  = false;
let score     = 0;

function el(id) { return document.getElementById(id); }

function init() {
  currentQ = 0;
  answered = false;
  score    = 0;

  el('quizGame').style.display   = 'block';
  el('quizResult').style.display = 'none';

  renderQuestion(0);
}

function renderQuestion(index) {
  const q   = questions[index];
  answered  = false;
  currentQ  = index;

  // Update progress
  const pct = (index / questions.length) * 100;
  el('quizProgressFill').style.width = `${pct}%`;
  el('quizNumber').innerHTML = `Soal <span>${index + 1} dari ${questions.length}</span>`;
  el('quizProgressBar').setAttribute('aria-valuenow', pct);

  // Render card
  el('quizCard').innerHTML = `
    <p class="quiz-question">${q.text}</p>

    <div class="quiz-options" id="quizOptions" role="list">
      ${q.options.map((opt, i) => `
        <button
          class="quiz-option"
          data-index="${i}"
          role="radio"
          aria-checked="false"
          aria-label="Pilihan ${opt.label}: ${opt.text}"
        >
          <span class="quiz-option__letter">${opt.label}</span>
          <span>${opt.text}</span>
        </button>
      `).join('')}
    </div>

    <div id="quizFeedback" aria-live="polite"></div>

    <div class="quiz-next">
      <button class="btn btn--primary" id="btnNext" style="display:none" aria-label="${index === questions.length - 1 ? 'Lihat hasil' : 'Soal berikutnya'}">
        ${index === questions.length - 1 ? 'Lihat Hasil →' : 'Selanjutnya →'}
      </button>
    </div>
  `;

  // Attach option listeners
  el('quizOptions').querySelectorAll('.quiz-option').forEach(btn => {
    btn.addEventListener('click', () => onAnswer(parseInt(btn.dataset.index)));
  });
}

function onAnswer(chosenIndex) {
  if (answered) return;
  answered = true;
  const q = questions[currentQ];

  const opts = el('quizOptions').querySelectorAll('.quiz-option');

  // Lock all options
  opts.forEach(opt => { opt.disabled = true; });

  if (chosenIndex === q.correct) {
    // Correct
    score++;
    sounds.correct?.();
    opts[chosenIndex].classList.add('is-correct');
    opts[chosenIndex].innerHTML += `<span class="quiz-option__icon" aria-hidden="true">✓</span>`;
    opts[chosenIndex].setAttribute('aria-checked', 'true');

    el('quizFeedback').innerHTML = `<div class="quiz-feedback quiz-feedback--correct">✓ Benar! Jawaban yang tepat adalah ${q.options[q.correct].text}!</div>`;
  } else {
    // Wrong
    sounds.wrong?.();
    opts[chosenIndex].classList.add('is-wrong');
    opts[chosenIndex].innerHTML += `<span class="quiz-option__icon" aria-hidden="true">✗</span>`;
    opts[chosenIndex].setAttribute('aria-checked', 'true');

    // Reveal correct
    opts[q.correct].classList.add('is-reveal');
    opts[q.correct].innerHTML += `<span class="quiz-option__icon" aria-hidden="true">✓</span>`;

    el('quizFeedback').innerHTML = `<div class="quiz-feedback quiz-feedback--wrong">✗ Jawaban yang benar adalah <strong>${q.options[q.correct].text}</strong>!</div>`;
  }

  // Show next button
  el('btnNext').style.display = 'inline-flex';
  el('btnNext').addEventListener('click', goNext);
  setTimeout(() => el('btnNext').focus(), 100);
}

function goNext() {
  if (currentQ + 1 < questions.length) {
    renderQuestion(currentQ + 1);
  } else {
    showResults();
  }
}

function showResults() {
  el('quizGame').style.display   = 'none';
  el('quizResult').style.display = 'block';

  // Save best score
  const best   = storage.getQuizBest();
  const isNew  = best === null || score > best;
  if (isNew) storage.setQuizBest(score);

  // Message based on score
  let message = '';
  if (score === 5)        message = 'Hebat! Kamu menguasai materi komputer!';
  else if (score >= 3)    message = 'Bagus! Sedikit lagi kamu akan semakin pintar!';
  else                    message = 'Jangan menyerah! Yuk, coba belajar lagi!';

  el('resultScore').textContent   = `${score}/5`;
  el('resultMessage').textContent = message;
  el('resultBest').textContent    = `🏆 Skor Terbaik: ${storage.getQuizBest()}/5`;

  if (score === 5) launchConfetti(4000);
  else if (score >= 3) launchConfetti(2500);
}

document.addEventListener('DOMContentLoaded', () => {
  init();
  el('btnUlangi').addEventListener('click', init);
});
