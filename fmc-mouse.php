<?php
$pageTitle  = 'Perbaiki Mouse';
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
        <h1 class="page-header__title">Perbaiki Mouse</h1>
        <p class="page-header__subtitle">Tombol mouse terlepas! Pasang kembali tombol kiri dan kanan.</p>
      </div>

      <div class="fmc-instructions" role="note">
        💡 <strong>Cara bermain:</strong> Seret tombol mouse dari "Suku Cadang" ke slot yang tepat pada mouse! Tombol kiri ke sisi kiri, tombol kanan ke sisi kanan.
      </div>

      <!-- Repair area -->
      <div id="repairArea">
        <div style="display:grid;grid-template-columns:1fr auto;gap:var(--space-6);align-items:center;background:var(--color-surface);border-radius:var(--radius-xl);padding:var(--space-6);border:2px solid var(--color-border);box-shadow:var(--shadow-sm)">

          <!-- Mouse body with slots -->
          <div style="display:flex;flex-direction:column;align-items:center;gap:var(--space-4)">
            <p style="font-size:var(--font-size-sm);font-weight:700;color:var(--color-text-muted)">🖱️ Mouse — Pasang tombol ke slot yang tepat</p>

            <div style="position:relative;width:200px;height:280px">
              <!-- Mouse body SVG -->
              <svg viewBox="0 0 200 280" style="width:100%;height:100%;position:absolute;inset:0" xmlns="http://www.w3.org/2000/svg">
                <!-- Main body -->
                <ellipse cx="100" cy="170" rx="80" ry="100" fill="#9B59B6"/>
                <!-- Scroll wheel -->
                <rect x="88" y="80" width="24" height="38" rx="12" fill="#E8D5F5"/>
                <!-- Cable -->
                <path d="M 100 55 Q 100 25 148 20" stroke="#7D3C98" stroke-width="5" fill="none" stroke-linecap="round"/>
                <!-- Outline -->
                <ellipse cx="100" cy="170" rx="80" ry="100" fill="none" stroke="#7D3C98" stroke-width="3"/>
                <!-- Center line -->
                <line x1="100" y1="55" x2="100" y2="145" stroke="#E8D5F5" stroke-width="2.5"/>
              </svg>

              <!-- Left button slot -->
              <div class="mouse-repair-slot"
                   data-side="left"
                   style="position:absolute;left:14px;top:30px;width:72px;height:72px;border-radius:20px 0 0 10px;"
                   aria-label="Slot tombol kiri mouse">
                Kiri?
              </div>

              <!-- Right button slot -->
              <div class="mouse-repair-slot"
                   data-side="right"
                   style="position:absolute;right:14px;top:30px;width:72px;height:72px;border-radius:0 20px 10px 0;"
                   aria-label="Slot tombol kanan mouse">
                Kanan?
              </div>
            </div>
          </div>

          <!-- Spare parts -->
          <div class="fmc-spare-parts">
            <div class="fmc-spare-parts__label">Suku Cadang</div>
            <div
              id="btnPieceLeft"
              class="mouse-btn-piece mouse-btn-piece--left"
              data-locked="false"
              role="button"
              tabindex="0"
              aria-label="Tombol kiri mouse, seret ke slot kiri"
              style="cursor:grab"
            >
              🖱️ Kiri
            </div>
            <div
              id="btnPieceRight"
              class="mouse-btn-piece mouse-btn-piece--right"
              data-locked="false"
              role="button"
              tabindex="0"
              aria-label="Tombol kanan mouse, seret ke slot kanan"
              style="cursor:grab"
            >
              🖱️ Kanan
            </div>
          </div>
        </div>
      </div>

      <!-- Success panel -->
      <div id="successPanel" style="display:none;flex-direction:column;align-items:center;text-align:center;padding:var(--space-7) var(--space-5)" role="alert" aria-live="assertive">
        <span style="font-size:72px;display:block;margin-bottom:var(--space-4)" aria-hidden="true">🖱️✨</span>
        <h2 style="font-size:var(--font-size-2xl);margin-bottom:var(--space-3);color:var(--color-success-dark)">Mouse Sudah Diperbaiki!</h2>
        <p style="color:var(--color-text-muted);margin-bottom:var(--space-6)">Tombol kiri dan kanan sudah terpasang dengan benar!</p>
        <div class="btn-group">
          <a href="fmc.php" class="btn btn--primary">← Kembali ke FMC</a>
          <a href="index.php" class="btn btn--ghost">🏠 Beranda</a>
        </div>
      </div>

    </div>
  </div>
</main>

<?php include 'partials/footer.php'; ?>

<script type="module" src="assets/js/fmc-mouse.js"></script>
</body>
</html>
