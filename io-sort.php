<?php
$pageTitle  = 'Input atau Output?';
$pageCSS    = 'io-sort.css';
$activePage = 'games';
include 'partials/head.php';
include 'partials/header.php';
?>
<main class="page-main" id="main-content">
  <div class="container io">
    <a href="games.php" class="back-link">← Kembali ke Menu Game</a>
    <div class="page-header">
      <p class="page-header__eyebrow">⬇️ Minigame</p>
      <h1 class="page-header__title">Input atau Output?</h1>
      <p class="page-header__subtitle"><strong>Input</strong> = memasukkan ke komputer. <strong>Output</strong> = komputer mengeluarkan sesuatu.</p>
    </div>

    <div class="io__stats"><span id="ioRound" aria-live="polite">Benda 1 dari 8</span><span id="ioScore">⭐ 0</span></div>
    <div class="io__sky" id="ioSky" aria-hidden="true"><div class="io__item" id="ioItem"></div></div>
    <p class="io__name" id="ioName" aria-live="assertive"></p>
    <p class="io__feedback" id="ioFeedback" aria-live="polite">Tekan tombol yang benar sebelum bendanya jatuh!</p>

    <div class="io__buttons">
      <button class="btn btn--secondary btn--lg io__btn" id="btnIn"  type="button" aria-label="Input (tombol panah kiri)">⌨️ INPUT</button>
      <button class="btn btn--primary btn--lg io__btn"   id="btnOut" type="button" aria-label="Output (tombol panah kanan)">🖥️ OUTPUT</button>
    </div>
    <p class="io__hint">Di komputer: tekan ← untuk Input, → untuk Output</p>
  </div>
</main>
<?php include 'partials/footer.php'; ?>
<script type="module" src="assets/js/io-sort.js"></script>
</body>
</html>
