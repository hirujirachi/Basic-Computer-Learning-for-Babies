<?php
$pageTitle  = 'Perbaiki Keyboard';
$pageCSS    = 'fmc.css';
$activePage = 'fmc';
include 'partials/head.php';
include 'partials/header.php';
?>
<main class="page-main" id="main-content">
  <div class="container">
    <div class="fmc-scene">

      <a href="fmc.php" class="back-link">← Kembali ke Fix My Computer</a>

      <div class="page-header">
        <p class="page-header__eyebrow">🔧 Fix My Computer</p>
        <h1 class="page-header__title">Perbaiki Keyboard</h1>
        <p class="page-header__subtitle">Beberapa tombol lepas! Pasang kembali ke tempat yang benar.</p>
      </div>

      <div class="fmc-instructions" role="note">
        💡 <strong>Cara bermain:</strong> Seret tombol dari kotak "Tombol Cadangan" ke slot kosong (<strong>?</strong>) yang sesuai di keyboard!
      </div>

      <!-- Repair area -->
      <div id="repairArea">
        <div class="fmc-repair-area">
          <div class="fmc-main-object">
            <p style="font-size:var(--font-size-sm);font-weight:700;color:var(--color-text-muted);margin-bottom:var(--space-4);text-align:center">
              ⌨️ Keyboard — Pasang tombol ke slot yang kosong
            </p>
            <div class="keyboard-repair-board" id="keyboardBoard" aria-label="Keyboard dengan slot kosong">
              <!-- Rows rendered by JS -->
            </div>
          </div>
          <div class="fmc-spare-parts">
            <div class="fmc-spare-parts__label">Tombol Cadangan</div>
            <div id="spareCaps" style="display:flex;flex-direction:column;gap:var(--space-2);align-items:center" aria-label="Tombol cadangan yang tersedia">
              <!-- Caps rendered by JS -->
            </div>
          </div>
        </div>
      </div>

      <!-- Success panel -->
      <div id="successPanel" style="display:none;flex-direction:column;align-items:center;text-align:center;padding:var(--space-7) var(--space-5)" role="alert" aria-live="assertive">
        <span style="font-size:72px;display:block;margin-bottom:var(--space-4)" aria-hidden="true">⌨️✨</span>
        <h2 style="font-size:var(--font-size-2xl);margin-bottom:var(--space-3);color:var(--color-success-dark)">Keyboard Sudah Diperbaiki!</h2>
        <p style="color:var(--color-text-muted);margin-bottom:var(--space-6)">Semua tombol sudah terpasang dengan benar!</p>
        <div class="btn-group">
          <a href="fmc.php" class="btn btn--primary">← Kembali ke FMC</a>
          <a href="index.php" class="btn btn--ghost">🏠 Beranda</a>
        </div>
      </div>

    </div>
  </div>
</main>

<?php include 'partials/footer.php'; ?>

<script type="module" src="assets/js/fmc-keyboard.js"></script>
</body>
</html>
