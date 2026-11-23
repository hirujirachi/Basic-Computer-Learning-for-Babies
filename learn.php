<?php
$pageTitle  = 'Mengenal Komputer';
$pageCSS    = 'learn.css';
$activePage = 'learn';
include 'partials/head.php';
include 'partials/header.php';
?>
<main class="page-main" id="main-content">
  <div class="container">
    <div class="learn-container">

      <a href="index.php" class="back-link" aria-label="Kembali ke beranda">
        ← Beranda
      </a>

      <div class="page-header">
        <p class="page-header__eyebrow">📚 Pelajaran</p>
        <h1 class="page-header__title">Mengenal Komputer</h1>
        <p class="page-header__subtitle">Yuk, kenali bagian-bagian komputer satu per satu!</p>
      </div>

      <?php
      $mascotMessage = 'Yuk belajar bersama Kiki! Gunakan tombol Selanjutnya untuk maju, atau Sebelumnya untuk mengulang. Semangat! 💪';
      $mascotSize    = 'md';
      $mascotTheme   = 'orange';
      $baseAssets    = '';
      include 'pages/partials/mascot-banner.php';
      ?>

      <div id="hintContainer"></div>

      <!-- Progress indicator -->
      <div class="learn-progress" aria-label="Progres pelajaran">
        <div class="learn-progress__label">
          <span id="progressLabel">Langkah 1 dari 5</span>
        </div>
        <div class="progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" id="progressBar">
          <div class="progress-bar__fill" id="progressFill" style="width:0%"></div>
        </div>
        <div class="learn-progress__dots" aria-hidden="true">
          <div class="step-dot" title="Langkah 1"></div>
          <div class="step-dot" title="Langkah 2"></div>
          <div class="step-dot" title="Langkah 3"></div>
          <div class="step-dot" title="Langkah 4"></div>
          <div class="step-dot" title="Langkah 5"></div>
        </div>
      </div>

      <!-- Step content is injected here by JS -->
      <div id="stepContainer" aria-live="polite"></div>

    </div>
  </div>
</main>

<?php include 'partials/footer.php'; ?>

<script type="module" src="assets/js/learn.js"></script>
<script type="module">
  import { initHintButton, initPlayerProfile } from './assets/js/player-profile.js';
  initPlayerProfile();
  initHintButton(
    document.getElementById('hintContainer'),
    'Gunakan tombol Selanjutnya → untuk maju ke materi berikutnya. Gunakan ← Sebelumnya untuk mengulang. Tekan selesai di langkah terakhir untuk mendapat lencana!'
  );
</script>
</body>
</html>
