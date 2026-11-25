<?php
$pageTitle  = 'Kuis & Permainan';
$pageCSS    = 'games.css';
$activePage = 'games';
include 'partials/head.php';
include 'partials/header.php';
?>
<main class="page-main" id="main-content">
  <div class="container">

    <a href="index.php" class="back-link">← Beranda</a>

    <div class="page-header">
      <p class="page-header__eyebrow">🎮 Permainan &amp; Kuis</p>
      <h1 class="page-header__title">Kuis &amp; Permainan</h1>
      <p class="page-header__subtitle">Pilih permainan atau kuis yang ingin kamu mainkan!</p>
    </div>

    <div class="games-grid">

      <!-- MINIGAME CATEGORY -->
      <section class="games-category games-category--minigame" aria-label="Minigame">
        <div class="games-category__label">🕹️ Minigame</div>
        <div class="games-row">

          <a href="match.php" class="game-card game-card--match" aria-label="Cocokkan Gambar – Cocokkan nama dengan gambar komputer">
            <div class="game-card__header">
              <div class="game-card__emoji" aria-hidden="true">🧩</div>
              <div>
                <h3 class="game-card__title">Cocokkan Gambar</h3>
                <span class="game-card__tag">Drag &amp; Drop</span>
              </div>
            </div>
            <p class="game-card__desc">Cocokkan nama bagian komputer dengan gambarnya dengan cara drag and drop!</p>
            <div class="game-card__footer">
              <span></span>
              <span class="game-card__play">Main Sekarang →</span>
            </div>
          </a>

          <a href="mouse-practice.php" class="game-card game-card--mouse" aria-label="Latihan Mouse – Latih ketepatan klik mouse kamu">
            <div class="game-card__header">
              <div class="game-card__emoji" aria-hidden="true">🖱️</div>
              <div>
                <h3 class="game-card__title">Latihan Mouse</h3>
                <span class="game-card__tag">Klik Cepat</span>
              </div>
            </div>
            <p class="game-card__desc">Klik target yang muncul secepat mungkin! Berapa banyak yang bisa kamu klik dalam 30 detik?</p>
            <div class="game-card__footer">
              <span id="mouseBestBadge"></span>
              <span class="game-card__play">Main Sekarang →</span>
            </div>
          </a>

          <a href="typing.php" class="game-card game-card--typing" aria-label="Latihan Mengetik – Latih kemampuan mengetik kamu">
            <div class="game-card__header">
              <div class="game-card__emoji" aria-hidden="true">⌨️</div>
              <div>
                <h3 class="game-card__title">Latihan Mengetik</h3>
                <span class="game-card__tag">Mengetik</span>
              </div>
            </div>
            <p class="game-card__desc">Ketik kata-kata yang muncul dengan cepat dan tepat! Latih jari-jarimu!</p>
            <div class="game-card__footer">
              <span></span>
              <span class="game-card__play">Main Sekarang →</span>
            </div>
          </a>

          <a href="extra-match.php" class="game-card game-card--extra" aria-label="Permainan Perangkat Tambahan – Cocokkan perangkat dengan fungsinya">
            <div class="game-card__header">
              <div class="game-card__emoji" aria-hidden="true">🔌</div>
              <div>
                <h3 class="game-card__title">Perangkat Tambahan</h3>
                <span class="game-card__tag">Cocok-cocokan</span>
              </div>
            </div>
            <p class="game-card__desc">Cocokkan speaker, printer, webcam, headset, dan flashdisk dengan fungsi yang tepat!</p>
            <div class="game-card__footer">
              <span id="extraMatchBestBadge"></span>
              <span class="game-card__play">Main Sekarang →</span>
            </div>
          </a>


          <a href="io-sort.php" class="game-card game-card--extra" aria-label="Input atau Output – Kelompokkan perangkat komputer">
            <div class="game-card__header">
              <div class="game-card__emoji" aria-hidden="true">⬇️</div>
              <div>
                <h3 class="game-card__title">Input atau Output?</h3>
                <span class="game-card__tag">Tebak Cepat</span>
              </div>
            </div>
            <p class="game-card__desc">Benda jatuh dari atas! Tebak apakah ia perangkat Input atau Output sebelum sampai ke bawah!</p>
            <div class="game-card__footer">
              <span class="game-card__play">Main Sekarang →</span>
            </div>
          </a>

        </div>
      </section>

      <!-- KUIS CATEGORY -->
      <section class="games-category games-category--quiz" aria-label="Kuis">
        <div class="games-category__label">📝 Kuis</div>
        <div class="games-row">

          <a href="quiz.php" class="game-card game-card--quiz" aria-label="Kuis Mengenal Komputer – Uji pengetahuanmu tentang komputer">
            <div class="game-card__header">
              <div class="game-card__emoji" aria-hidden="true">🏆</div>
              <div>
                <h3 class="game-card__title">Kuis Mengenal Komputer</h3>
                <span class="game-card__tag">5 Soal Pilihan Ganda</span>
              </div>
            </div>
            <p class="game-card__desc">Jawab 5 soal tentang bagian-bagian komputer. Berapa nilai yang bisa kamu raih?</p>
            <div class="game-card__footer">
              <span id="quizBestBadge"></span>
              <span class="game-card__play">Mulai Kuis →</span>
            </div>
          </a>

        </div>
      </section>

    </div>
  </div>
</main>

<?php include 'partials/footer.php'; ?>

<script type="module">
  import { storage } from './assets/js/storage.js';

  const quizBest       = storage.getQuizBest();
  const mouseBest      = storage.getMouseBest();
  const extraMatchBest = storage.getExtraMatchBest();

  if (quizBest !== null) {
    document.getElementById('quizBestBadge').innerHTML =
      `<span class="badge badge--success">🏅 Terbaik: ${quizBest}/5</span>`;
  }
  if (mouseBest !== null) {
    document.getElementById('mouseBestBadge').innerHTML =
      `<span class="badge badge--success">🏅 Terbaik: ${mouseBest}</span>`;
  }
  if (extraMatchBest !== null) {
    document.getElementById('extraMatchBestBadge').innerHTML =
      `<span class="badge badge--success">🏅 Terbaik: ${extraMatchBest}/5</span>`;
  }
</script>
</body>
</html>
