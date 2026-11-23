<?php
$pageTitle  = 'Latihan Mouse';
$pageCSS    = 'mouse-practice.css';
$activePage = 'games';
include 'partials/head.php';
include 'partials/header.php';
?>
<main class="page-main" id="main-content">
  <div class="container" style="max-width:720px">

    <a href="games.php" class="back-link">← Kembali ke Menu Game</a>

    <div class="page-header">
      <p class="page-header__eyebrow">🖱️ Minigame</p>
      <h1 class="page-header__title">Latihan Mouse</h1>
      <p class="page-header__subtitle">Klik target yang muncul secepat mungkin! Kamu punya 30 detik!</p>
    </div>

    <!-- Game panel -->
    <div id="mouseGame">
      <!-- Stats -->
      <div class="mouse-stats">
        <div class="mouse-stat">
          <span class="mouse-stat__label">Skor</span>
          <span class="mouse-stat__value" id="mouseScore" aria-live="polite" aria-atomic="true">0</span>
        </div>
        <div style="flex:1">
          <div style="font-size:var(--font-size-xs);font-weight:700;text-transform:uppercase;color:var(--color-text-muted);margin-bottom:6px">Waktu</div>
          <div class="progress-bar" style="height:16px">
            <div class="progress-bar__fill" id="mouseProgressFill" style="width:100%;background:linear-gradient(90deg,var(--color-secondary),var(--color-primary))"></div>
          </div>
        </div>
        <div class="mouse-stat mouse-stat--timer" id="mouseTimerStat">
          <span class="mouse-stat__label">Detik</span>
          <span class="mouse-stat__value" id="mouseTimer" aria-live="polite" aria-atomic="true">30</span>
        </div>
      </div>

      <!-- Playground -->
      <div class="mouse-playground mouse-playground--inactive" id="mousePlayground" aria-label="Area permainan – klik target">
        <div class="mouse-idle-msg" id="mouseIdle">
          <span class="idle-emoji" aria-hidden="true">🖱️</span>
          <span>Tekan <strong>Mulai</strong> untuk bermain!</span>
        </div>
      </div>

      <!-- Controls -->
      <div class="mouse-controls">
        <button class="btn btn--primary" id="btnStart">▶ Mulai</button>
        <button class="btn btn--ghost" id="btnRestart">↺ Ulangi</button>
        <a href="games.php" class="btn btn--ghost">← Menu Game</a>
      </div>
    </div>

    <!-- Result panel -->
    <div id="mouseResult" style="display:none" role="alert" aria-live="assertive">
      <div class="mouse-result">
        <p style="font-size:var(--font-size-md);color:var(--color-text-muted);margin-bottom:var(--space-2)">Waktu habis! Skor kamu:</p>
        <div class="mouse-result__score" id="resultScore">0</div>
        <div class="mouse-result__label">target berhasil diklik</div>
        <div class="mouse-result__best" id="resultBest"></div>
        <p class="mouse-result__message" id="resultMessage"></p>
        <div class="btn-group">
          <button class="btn btn--primary" id="btnRestartResult">↺ Ulangi</button>
          <a href="games.php" class="btn btn--ghost">← Menu Game</a>
        </div>
      </div>
    </div>

  </div>
</main>

<?php include 'partials/footer.php'; ?>

<script type="module" src="assets/js/mouse-practice.js"></script>
</body>
</html>
