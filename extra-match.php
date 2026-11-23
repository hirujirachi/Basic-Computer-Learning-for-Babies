<?php
$pageTitle  = 'Permainan Perangkat Tambahan';
$pageCSS    = 'extra-match.css';
$activePage = 'games';
include 'partials/head.php';
include 'partials/header.php';
?>
<main class="page-main" id="main-content">
  <div class="container">
    <div class="em-container">

      <a href="games.php" class="back-link">← Kembali ke Menu Game</a>

      <div class="page-header">
        <p class="page-header__eyebrow">🔌 Minigame</p>
        <h1 class="page-header__title">Permainan Perangkat Tambahan</h1>
        <p class="page-header__subtitle">Cocokkan setiap perangkat dengan fungsinya yang benar!</p>
      </div>

      <div class="em-instructions" role="note">
        💡 <strong>Cara bermain:</strong> Pilih (klik atau seret) gambar perangkat di kiri, lalu klik kotak fungsi yang sesuai di kanan. Cocokkan semua 5 perangkat dengan benar!
      </div>

      <div id="gamePanel">
        <div class="em-score-bar">
          <span class="em-score-label" id="extraMatchProgressLabel" aria-live="polite">0 dari 5 cocok</span>
          <div class="progress-bar" style="flex:1" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
            <div class="progress-bar__fill" id="extraMatchProgressFill" style="width:0%"></div>
          </div>
          <div id="extraMatchBestBadge"></div>
        </div>

        <div class="em-board">
          <div>
            <div class="em-col__label">🖼️ Perangkat</div>
            <div class="em-col" id="extraImgCol" aria-label="Kolom perangkat – pilih perangkat untuk dicocokkan">
            </div>
          </div>
          <div>
            <div class="em-col__label">📋 Fungsinya</div>
            <div class="em-col" id="extraFuncCol" aria-label="Kolom fungsi – tempat drop perangkat">
            </div>
          </div>
        </div>

        <div class="btn-group" style="margin-top:var(--space-4)">
          <button class="btn btn--ghost" id="btnExtraRestart">↺ Ulangi</button>
          <a href="extra-hardware.php" class="btn btn--ghost">📖 Lihat Materi</a>
          <a href="games.php" class="btn btn--ghost">← Menu Game</a>
        </div>
      </div>

      <div id="resultPanel" style="display:none" role="alert" aria-live="assertive">
        <div class="em-result">
          <span style="font-size:72px;display:block;margin-bottom:var(--space-3)" aria-hidden="true">🎉</span>
          <h2 style="font-size:var(--font-size-xl);margin-bottom:var(--space-2)">Semua Cocok! Hebat!</h2>
          <p id="extraMatchMessage" style="color:var(--color-text-muted);margin-bottom:var(--space-4)"></p>

          <div class="em-result__stats">
            <div class="em-stat">
              <div class="em-stat__label">Skor</div>
              <div class="em-stat__value" id="extraMatchScore">5/5</div>
            </div>
            <div class="em-stat">
              <div class="em-stat__label">Total Percobaan</div>
              <div class="em-stat__value" id="extraMatchAttempts">5</div>
            </div>
          </div>

          <div class="btn-group">
            <button class="btn btn--primary" id="btnExtraRestartResult">🔄 Main Lagi</button>
            <a href="extra-hardware.php" class="btn btn--secondary">📖 Pelajari Lagi</a>
            <a href="games.php" class="btn btn--ghost">← Menu Game</a>
          </div>
        </div>
      </div>

    </div>
  </div>
</main>

<?php include 'partials/footer.php'; ?>

<script type="module" src="assets/js/extra-match.js"></script>
</body>
</html>
