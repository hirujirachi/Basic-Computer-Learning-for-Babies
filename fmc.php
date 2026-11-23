<?php
$pageTitle  = 'Fix My Computer';
$pageCSS    = 'fmc.css';
$activePage = 'fmc';
include 'partials/head.php';
include 'partials/header.php';
?>
<main class="page-main" id="main-content">
  <div class="container">

    <a href="index.php" class="back-link">← Beranda</a>

    <div class="page-header">
      <p class="page-header__eyebrow">🔧 Permainan</p>
      <h1 class="page-header__title">Fix My Computer!</h1>
      <p class="page-header__subtitle">Komputer rusak! Perbaiki semua bagiannya agar berfungsi kembali!</p>
    </div>

    <!-- Main game -->
    <div id="fmcGame">

      <!-- Overall progress -->
      <div class="fmc-progress-bar-wrap">
        <div class="fmc-progress-label" id="fmcProgressLabel" aria-live="polite">0 dari 4 sudah diperbaiki</div>
        <div class="progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
          <div class="progress-bar__fill" id="fmcProgressFill" style="width:0%"></div>
        </div>
      </div>

      <!-- Parts grid -->
      <div class="fmc-grid">

        <!-- KEYBOARD -->
        <a href="fmc-keyboard.php" class="fmc-part" id="fmc-part-keyboard" aria-label="Perbaiki Keyboard">
          <div class="fmc-part__illustration" aria-hidden="true">
            <!-- Broken keyboard SVG -->
            <svg viewBox="0 0 120 90" xmlns="http://www.w3.org/2000/svg">
              <rect x="5" y="22" width="110" height="58" rx="8" fill="#FF6B35" opacity=".75"/>
              <!-- Missing key gaps -->
              <rect x="12" y="30" width="14" height="12" rx="3" fill="white" opacity=".8"/>
              <rect x="30" y="30" width="14" height="12" rx="3" fill="#C0392B" opacity=".5"/><!-- missing -->
              <rect x="48" y="30" width="14" height="12" rx="3" fill="white" opacity=".8"/>
              <rect x="66" y="30" width="14" height="12" rx="3" fill="white" opacity=".8"/>
              <rect x="84" y="30" width="14" height="12" rx="3" fill="#C0392B" opacity=".5"/><!-- missing -->
              <rect x="102" y="30" width="14" height="12" rx="3" fill="white" opacity=".8"/>
              <rect x="12" y="47" width="20" height="12" rx="3" fill="white" opacity=".8"/>
              <rect x="36" y="47" width="14" height="12" rx="3" fill="white" opacity=".8"/>
              <rect x="54" y="47" width="14" height="12" rx="3" fill="#C0392B" opacity=".5"/><!-- missing -->
              <rect x="72" y="47" width="14" height="12" rx="3" fill="white" opacity=".8"/>
              <rect x="90" y="47" width="26" height="12" rx="3" fill="white" opacity=".8"/>
              <rect x="30" y="64" width="60" height="10" rx="3" fill="white" opacity=".8"/>
              <!-- Crack line -->
              <path d="M 50 22 L 60 42 L 72 30 L 80 70" stroke="#A93226" stroke-width="2" fill="none" stroke-linecap="round" class="broken-crack"/>
            </svg>
          </div>
          <h3 class="fmc-part__name">Keyboard</h3>
          <span class="fmc-part__status">Ketuk untuk memperbaiki</span>
        </a>

        <!-- MOUSE -->
        <a href="fmc-mouse.php" class="fmc-part" id="fmc-part-mouse" aria-label="Perbaiki Mouse">
          <div class="fmc-part__illustration" aria-hidden="true">
            <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
              <!-- Mouse body -->
              <ellipse cx="60" cy="72" rx="38" ry="46" fill="#9B59B6" opacity=".75"/>
              <!-- Left button — detached -->
              <rect x="8" y="38" width="30" height="22" rx="8" fill="#A569BD" opacity=".8" class="broken-crack"/>
              <!-- Right button — detached -->
              <rect x="82" y="38" width="30" height="22" rx="8" fill="#8E44AD" opacity=".8" class="broken-crack"/>
              <!-- Scroll wheel -->
              <rect x="52" y="40" width="16" height="22" rx="8" fill="#E8D5F5"/>
              <!-- Center divider -->
              <line x1="60" y1="34" x2="60" y2="80" stroke="#E8D5F5" stroke-width="2" opacity=".5"/>
              <ellipse cx="60" cy="72" rx="38" ry="46" fill="none" stroke="#7D3C98" stroke-width="2.5"/>
              <!-- Broken lines -->
              <path d="M 24 48 L 40 55" stroke="#E74C3C" stroke-width="2" stroke-dasharray="4 3" class="broken-crack"/>
              <path d="M 96 48 L 80 55" stroke="#E74C3C" stroke-width="2" stroke-dasharray="4 3" class="broken-crack"/>
            </svg>
          </div>
          <h3 class="fmc-part__name">Mouse</h3>
          <span class="fmc-part__status">Ketuk untuk memperbaiki</span>
        </a>

        <!-- MONITOR -->
        <a href="fmc-monitor.php" class="fmc-part" id="fmc-part-monitor" aria-label="Perbaiki Monitor">
          <div class="fmc-part__illustration" aria-hidden="true">
            <svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg">
              <rect x="6" y="10" width="108" height="70" rx="8" fill="#3498DB" opacity=".75"/>
              <rect x="14" y="18" width="92" height="54" rx="5" fill="#D6EAF8"/>
              <!-- Crack pattern -->
              <path d="M 50 18 L 62 36 L 54 36 L 70 72" stroke="#E74C3C" stroke-width="2.5" fill="none" stroke-linecap="round" class="broken-crack"/>
              <path d="M 62 36 L 90 50" stroke="#E74C3C" stroke-width="1.5" fill="none" stroke-linecap="round" class="broken-crack"/>
              <path d="M 54 36 L 30 60" stroke="#E74C3C" stroke-width="1.5" fill="none" stroke-linecap="round" class="broken-crack"/>
              <!-- Stand -->
              <rect x="52" y="80" width="16" height="10" rx="3" fill="#2980B9"/>
              <rect x="38" y="90" width="44" height="6" rx="3" fill="#1A6E9E"/>
            </svg>
          </div>
          <h3 class="fmc-part__name">Monitor</h3>
          <span class="fmc-part__status">Ketuk untuk memperbaiki</span>
        </a>

        <!-- PC -->
        <a href="fmc-pc.php" class="fmc-part" id="fmc-part-pc" aria-label="Perbaiki PC">
          <div class="fmc-part__illustration" aria-hidden="true">
            <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
              <rect x="22" y="8" width="76" height="104" rx="8" fill="#E74C3C" opacity=".75"/>
              <rect x="30" y="16" width="60" height="80" rx="5" fill="#C0392B"/>
              <circle cx="60" cy="30" r="9" fill="#E74C3C"/>
              <circle cx="60" cy="30" r="6" fill="#FF6B35"/>
              <!-- Disconnected cables hanging loose -->
              <path d="M 22 50 L 2 50 L 2 65" stroke="#3498DB" stroke-width="4" fill="none" stroke-linecap="round" class="broken-crack"/>
              <path d="M 22 62 L 2 62 L 2 80" stroke="#FF6B35" stroke-width="4" fill="none" stroke-linecap="round" class="broken-crack"/>
              <path d="M 22 74 L 2 74 L 2 95" stroke="#9B59B6" stroke-width="4" fill="none" stroke-linecap="round" class="broken-crack"/>
              <!-- Port slots -->
              <rect x="22" y="46" width="8" height="8" rx="2" fill="#95A5A6"/>
              <rect x="22" y="58" width="8" height="8" rx="2" fill="#95A5A6"/>
              <rect x="22" y="70" width="8" height="8" rx="2" fill="#95A5A6"/>
            </svg>
          </div>
          <h3 class="fmc-part__name">PC</h3>
          <span class="fmc-part__status">Ketuk untuk memperbaiki</span>
        </a>

      </div>
    </div>

    <!-- Victory screen -->
    <div id="victoryPanel" role="alert" aria-live="assertive" style="display:none">
      <div class="fmc-victory">
        <span class="fmc-victory__trophy" aria-hidden="true">🏆</span>
        <h2 style="font-size:var(--font-size-2xl);font-weight:900;margin-bottom:var(--space-3);color:var(--color-primary)">
          Hebat!
        </h2>
        <p style="font-size:var(--font-size-lg);font-weight:700;margin-bottom:var(--space-3)">
          Komputermu sudah berfungsi kembali!
        </p>
        <p style="color:var(--color-text-muted);margin-bottom:var(--space-6)">
          Kamu berhasil memperbaiki semua bagian komputer. Luar biasa! 🎉
        </p>
        <div class="btn-group">
          <button class="btn btn--primary" id="btnPlayAgain">🔄 Main Lagi</button>
          <a href="index.php" class="btn btn--ghost">🏠 Kembali ke Beranda</a>
        </div>
      </div>
    </div>

  </div>
</main>

<?php include 'partials/footer.php'; ?>

<script type="module" src="assets/js/fmc.js"></script>
</body>
</html>
