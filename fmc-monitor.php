<?php
$pageTitle  = 'Perbaiki Monitor';
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
        <h1 class="page-header__title">Perbaiki Monitor</h1>
        <p class="page-header__subtitle">Layar monitor retak! Ganti dengan layar yang baru.</p>
      </div>

      <!-- Step indicator -->
      <div style="display:flex;gap:var(--space-3);margin-bottom:var(--space-5);justify-content:center;flex-wrap:wrap">
        <div id="stepBadge1" style="display:flex;align-items:center;gap:var(--space-2);padding:8px 16px;border-radius:var(--radius-full);background:var(--color-primary);color:white;font-size:var(--font-size-sm);font-weight:700">
          <span>1</span> Lepaskan layar retak
        </div>
        <div style="color:var(--color-text-muted);font-size:20px;line-height:1.6">→</div>
        <div id="stepBadge2" style="display:flex;align-items:center;gap:var(--space-2);padding:8px 16px;border-radius:var(--radius-full);background:var(--color-border);color:var(--color-text-muted);font-size:var(--font-size-sm);font-weight:700">
          <span>2</span> Pasang layar baru
        </div>
      </div>

      <div id="repairWrapper">

        <!-- STEP 1: Remove cracked screen -->
        <div id="step1" style="display:flex;gap:var(--space-6);align-items:center;flex-wrap:wrap;background:var(--color-surface);border-radius:var(--radius-xl);padding:var(--space-6);border:2px solid var(--color-border);box-shadow:var(--shadow-sm)">
          <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:var(--space-4)">
            <p style="font-size:var(--font-size-sm);font-weight:700;color:var(--color-text-muted);text-align:center">Seret layar retak ke zona pembuangan!</p>
            <!-- Monitor frame with cracked screen inside it -->
            <div class="monitor-repair-frame" style="position:relative">
              <!-- Slot inside -->
              <div id="monitorSlot" class="monitor-screen-slot" aria-label="Slot layar monitor">
                <!-- Cracked screen on top of slot -->
                <div
                  id="crackedScreen"
                  class="monitor-cracked-screen"
                  role="button"
                  tabindex="0"
                  aria-label="Layar retak – seret ke kotak pembuangan"
                  style="position:absolute;inset:0;width:100%;height:100%;cursor:grab;touch-action:none"
                >
                  <!-- Crack SVG overlay -->
                  <svg style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none" viewBox="0 0 220 155" aria-hidden="true">
                    <path d="M 80 0 L 100 45 L 85 45 L 110 110 L 180 70" stroke="#E74C3C" stroke-width="3" fill="none" stroke-linecap="round"/>
                    <path d="M 100 45 L 145 80" stroke="#E74C3C" stroke-width="2" fill="none" stroke-linecap="round"/>
                    <path d="M 85 45 L 50 90" stroke="#E74C3C" stroke-width="2" fill="none" stroke-linecap="round"/>
                    <path d="M 50 90 L 30 130" stroke="#C0392B" stroke-width="1.5" fill="none" stroke-linecap="round"/>
                  </svg>
                  <span style="font-size:var(--font-size-sm);font-weight:700;color:var(--color-error);position:relative;z-index:1">💥 Layar Retak</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Removal zone -->
          <div style="display:flex;flex-direction:column;align-items:center;gap:var(--space-3)">
            <div class="fmc-instructions" style="font-size:var(--font-size-sm);max-width:140px;text-align:center">
              💡 Seret layar retak ke sini!
            </div>
            <div class="removal-zone" id="removeZone" aria-label="Zona pembuangan layar retak">
              🗑️ Buang<br>di sini
            </div>
          </div>
        </div>

        <!-- STEP 2: Install new screen -->
        <div id="step2" style="display:none;gap:var(--space-6);align-items:center;flex-wrap:wrap;background:var(--color-surface);border-radius:var(--radius-xl);padding:var(--space-6);border:2px solid var(--color-border);box-shadow:var(--shadow-sm)">
          <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:var(--space-4)">
            <p style="font-size:var(--font-size-sm);font-weight:700;color:var(--color-text-muted);text-align:center">Bagus! Sekarang pasang layar baru!</p>
            <!-- Monitor frame — empty slot -->
            <div class="monitor-repair-frame">
              <div id="monitorSlotNew" class="monitor-screen-slot" aria-label="Slot layar monitor kosong – pasang layar baru">
                Pasang layar baru di sini
              </div>
            </div>
          </div>

          <!-- New screen spare -->
          <div style="display:flex;flex-direction:column;align-items:center;gap:var(--space-3)">
            <div class="fmc-spare-parts__label">Layar Baru</div>
            <div
              id="newScreen"
              class="monitor-new-screen"
              role="button"
              tabindex="0"
              aria-label="Layar baru – seret ke monitor"
              style="cursor:grab;touch-action:none;width:120px;height:85px;font-size:var(--font-size-xs)"
            >
              ✨ Layar Baru
            </div>
          </div>
        </div>

      </div>

      <!-- Success panel -->
      <div id="successPanel" style="display:none;flex-direction:column;align-items:center;text-align:center;padding:var(--space-7) var(--space-5)" role="alert" aria-live="assertive">
        <span style="font-size:72px;display:block;margin-bottom:var(--space-4)" aria-hidden="true">🖥️✨</span>
        <h2 style="font-size:var(--font-size-2xl);margin-bottom:var(--space-3);color:var(--color-success-dark)">Monitor Sudah Diperbaiki!</h2>
        <p style="color:var(--color-text-muted);margin-bottom:var(--space-6)">Layar baru sudah terpasang dan monitor berfungsi kembali!</p>
        <div class="btn-group">
          <a href="fmc.php" class="btn btn--primary">← Kembali ke FMC</a>
          <a href="index.php" class="btn btn--ghost">🏠 Beranda</a>
        </div>
      </div>

    </div>
  </div>
</main>

<?php include 'partials/footer.php'; ?>

<script type="module" src="assets/js/fmc-monitor.js"></script>
</body>
</html>
