<?php
$pageTitle  = 'Perbaiki PC';
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
        <h1 class="page-header__title">Perbaiki PC</h1>
        <p class="page-header__subtitle">Kabel-kabel terputus! Hubungkan setiap kabel ke port yang benar di PC.</p>
      </div>

      <div class="fmc-instructions" role="note">
        💡 <strong>Cara bermain:</strong> Seret kabel dari kolom kiri ke port yang sesuai di PC! Setiap kabel hanya bisa masuk ke port yang cocok. Perhatikan warna dan label port!
      </div>

      <!-- Repair area -->
      <div id="repairArea">
        <div class="fmc-repair-area" style="grid-template-columns:1fr 1fr;gap:var(--space-6)">

          <!-- Cables side -->
          <div>
            <div class="fmc-spare-parts__label" style="margin-bottom:var(--space-4)">🔌 Kabel Tersedia</div>
            <div style="display:flex;flex-direction:column;gap:var(--space-5)">

              <div class="cable-item">
                <div
                  class="cable-plug cable-plug--monitor"
                  data-cable="monitor"
                  data-locked="false"
                  role="button"
                  tabindex="0"
                  aria-label="Kabel Monitor – seret ke port Monitor di PC"
                  style="cursor:grab;touch-action:none;width:90px;height:44px;font-size:var(--font-size-xs);font-weight:800"
                >
                  🖥️ Monitor
                </div>
                <span class="cable-label">Kabel Monitor</span>
              </div>

              <div class="cable-item">
                <div
                  class="cable-plug cable-plug--keyboard"
                  data-cable="keyboard"
                  data-locked="false"
                  role="button"
                  tabindex="0"
                  aria-label="Kabel Keyboard – seret ke port Keyboard di PC"
                  style="cursor:grab;touch-action:none;width:90px;height:44px;font-size:var(--font-size-xs);font-weight:800"
                >
                  ⌨️ Keyboard
                </div>
                <span class="cable-label">Kabel Keyboard</span>
              </div>

              <div class="cable-item">
                <div
                  class="cable-plug cable-plug--mouse"
                  data-cable="mouse"
                  data-locked="false"
                  role="button"
                  tabindex="0"
                  aria-label="Kabel Mouse – seret ke port Mouse di PC"
                  style="cursor:grab;touch-action:none;width:90px;height:44px;font-size:var(--font-size-xs);font-weight:800"
                >
                  🖱️ Mouse
                </div>
                <span class="cable-label">Kabel Mouse</span>
              </div>

            </div>
          </div>

          <!-- PC side with ports -->
          <div>
            <div class="fmc-spare-parts__label" style="margin-bottom:var(--space-4)">💻 Port di PC</div>

            <!-- PC case illustration -->
            <div style="display:flex;justify-content:center;margin-bottom:var(--space-4)">
              <svg viewBox="0 0 120 160" style="width:100px;height:135px" xmlns="http://www.w3.org/2000/svg">
                <rect x="10" y="10" width="100" height="150" rx="10" fill="#E74C3C"/>
                <rect x="18" y="20" width="84" height="120" rx="6" fill="#C0392B"/>
                <circle cx="60" cy="36" r="10" fill="#E74C3C"/>
                <circle cx="60" cy="36" r="7" fill="#FF6B35"/>
                <circle cx="78" cy="36" r="4" fill="#2ECC71"/>
                <rect x="20" y="52" width="80" height="10" rx="3" fill="#E74C3C"/>
                <rect x="20" y="66" width="80" height="10" rx="3" fill="#E74C3C"/>
                <rect x="20" y="80" width="80" height="10" rx="3" fill="#E74C3C"/>
                <line x1="20" y1="100" x2="100" y2="100" stroke="#A93226" stroke-width="1.5"/>
                <line x1="20" y1="108" x2="100" y2="108" stroke="#A93226" stroke-width="1.5"/>
              </svg>
            </div>

            <div class="pc-ports" aria-label="Port-port di PC">
              <div class="pc-port" data-cable="monitor" aria-label="Port Monitor – hubungkan kabel Monitor">
                <span style="font-size:20px">🖥️</span>
                <span>Port Monitor</span>
              </div>
              <div class="pc-port" data-cable="keyboard" aria-label="Port Keyboard – hubungkan kabel Keyboard">
                <span style="font-size:20px">⌨️</span>
                <span>Port Keyboard</span>
              </div>
              <div class="pc-port" data-cable="mouse" aria-label="Port Mouse – hubungkan kabel Mouse">
                <span style="font-size:20px">🖱️</span>
                <span>Port Mouse</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- Success panel -->
      <div id="successPanel" style="display:none;flex-direction:column;align-items:center;text-align:center;padding:var(--space-7) var(--space-5)" role="alert" aria-live="assertive">
        <span style="font-size:72px;display:block;margin-bottom:var(--space-4)" aria-hidden="true">💻✨</span>
        <h2 style="font-size:var(--font-size-2xl);margin-bottom:var(--space-3);color:var(--color-success-dark)">PC Sudah Diperbaiki!</h2>
        <p style="color:var(--color-text-muted);margin-bottom:var(--space-6)">Semua kabel sudah terhubung ke port yang benar!</p>
        <div class="btn-group">
          <a href="fmc.php" class="btn btn--primary">← Kembali ke FMC</a>
          <a href="index.php" class="btn btn--ghost">🏠 Beranda</a>
        </div>
      </div>

    </div>
  </div>
</main>

<?php include 'partials/footer.php'; ?>

<script type="module" src="assets/js/fmc-pc.js"></script>
</body>
</html>
