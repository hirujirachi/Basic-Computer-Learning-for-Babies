<?php
$pageTitle  = 'Latihan Mengetik';
$pageCSS    = 'typing.css';
$activePage = 'games';
include 'partials/head.php';
include 'partials/header.php';
?>
<main class="page-main" id="main-content">
  <div class="container">
    <div class="typing-container">

      <a href="games.php" class="back-link">← Kembali ke Menu Game</a>

      <div class="page-header">
        <p class="page-header__eyebrow">⌨️ Minigame</p>
        <h1 class="page-header__title">Latihan Mengetik</h1>
        <p class="page-header__subtitle">Ketik kata yang muncul dengan tepat!</p>
      </div>

      <!-- Game panel -->
      <div id="gamePanel">
        <!-- Word progress -->
        <div class="typing-progress">
          <div class="typing-progress__label" id="wordProgress" aria-live="polite">
            Kata <span>1 dari 5</span>
          </div>
          <button class="btn btn--ghost btn--sm" id="btnRestart" type="button">↺ Ulangi</button>
        </div>
        <div class="progress-bar" style="margin-bottom:var(--space-5)">
          <div class="progress-bar__fill" id="wordProgressFill" style="width:0%"></div>
        </div>

        <!-- Word card -->
        <div class="typing-word-card">
          <div class="typing-guide-word" id="guideWord" aria-live="polite" aria-label="Kata yang harus diketik">
            <!-- JS rendered character spans -->
          </div>
          <div class="typing-input-row">
            <input
              type="text"
              class="typing-input"
              id="typingInput"
              autocomplete="off"
              autocorrect="off"
              autocapitalize="off"
              spellcheck="false"
              placeholder="Ketik di sini..."
              aria-label="Ketik kata yang terlihat di atas"
            />
          </div>

          <!-- Accuracy bar -->
          <div class="typing-accuracy">
            <span>Akurasi: <strong id="accuracyValue">100%</strong></span>
            <div class="progress-bar" style="height:8px">
              <div class="progress-bar__fill" id="accuracyFill" style="width:100%;background:var(--color-success)"></div>
            </div>
          </div>
        </div>

        <div class="text-center text-muted" style="font-size:var(--font-size-sm)">
          💡 Tip: Hindari copy-paste ya! Ketik sendiri!
        </div>
      </div>

      <!-- Result panel -->
      <div id="resultPanel" style="display:none" role="alert" aria-live="assertive">
        <div class="typing-result">
          <span style="font-size:60px;display:block;margin-bottom:var(--space-3)" aria-hidden="true">🎉</span>
          <h2 style="font-size:var(--font-size-xl);margin-bottom:var(--space-2)">Kerja Bagus!</h2>
          <p style="color:var(--color-text-muted);margin-bottom:var(--space-5)">Kamu berhasil menyelesaikan semua kata!</p>

          <div class="typing-result__stats">
            <div class="typing-stat">
              <div class="typing-stat__label">Akurasi</div>
              <div class="typing-stat__value" id="resultAccuracy">100%</div>
            </div>
            <div class="typing-stat">
              <div class="typing-stat__label">Kata Selesai</div>
              <div class="typing-stat__value" id="resultWords">5/5</div>
            </div>
            <div class="typing-stat">
              <div class="typing-stat__label">Waktu</div>
              <div class="typing-stat__value" id="resultTime">0s</div>
            </div>
          </div>

          <div id="typingRewardArea" aria-live="polite"></div>

          <div class="btn-group">
            <button class="btn btn--primary" id="btnRestartResult">↺ Ulangi</button>
            <a href="games.php" class="btn btn--ghost">← Menu Game</a>
          </div>
        </div>
      </div>

    </div>
  </div>
</main>

<?php include 'partials/footer.php'; ?>

<script type="module" src="assets/js/typing.js"></script>
</body>
</html>
