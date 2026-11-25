<?php
$pageTitle  = 'Cocokkan Gambar';
$pageCSS    = 'match.css';
$activePage = 'games';
include 'partials/head.php';
include 'partials/header.php';
?>
<main class="page-main" id="main-content">
  <div class="container" style="max-width:800px">

    <a href="games.php" class="back-link">← Kembali ke Menu Game</a>

    <div class="page-header">
      <p class="page-header__eyebrow">🧩 Minigame</p>
      <h1 class="page-header__title">Cocokkan Gambar</h1>
      <p class="page-header__subtitle">Seret gambar ke kotak nama yang sesuai!</p>
    </div>

    <div class="match-instructions" role="note">
      💡 <strong>Cara bermain:</strong> Seret (drag) gambar di kiri ke kotak nama yang cocok di kanan!
    </div>

    <div class="match-score" aria-live="polite" aria-atomic="true" id="matchScore">
      Cocok: <span>0 / 4</span>
    </div>

    <!-- Game board -->
    <div class="match-board">
      <div>
        <div class="match-col__label">🖼️ Gambar</div>
        <div class="match-items" id="imageCol" aria-label="Kolom gambar – seret gambar ke kanan">
          <!-- Rendered by JS -->
        </div>
      </div>
      <div>
        <div class="match-col__label">📝 Nama</div>
        <div class="match-items" id="nameCol" aria-label="Kolom nama – tempat drop gambar">
          <!-- Rendered by JS -->
        </div>
      </div>
    </div>

    <!-- Win panel -->
    <div class="match-win" id="winPanel" role="alert" aria-live="assertive" style="display:none">
      <span class="match-win__emoji" aria-hidden="true">🎉</span>
      <h2 class="match-win__title">Hebat! Semua cocok!</h2>
      <p style="color:var(--color-text-muted);margin-bottom:var(--space-5)">Kamu berhasil mencocokkan semua gambar! 👍</p>
      <div id="matchRewardArea" aria-live="polite"></div>
      <div class="btn-group">
        <button class="btn btn--primary" id="btnRestart">🔄 Main Lagi</button>
        <a href="games.php" class="btn btn--ghost">← Kembali ke Menu Game</a>
      </div>
    </div>

  </div>
</main>

<?php include 'partials/footer.php'; ?>

<script type="module" src="assets/js/match.js"></script>
</body>
</html>
