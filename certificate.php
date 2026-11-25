<?php
$pageTitle  = 'Sertifikat';
$pageCSS    = '';
$activePage = '';
include 'partials/head.php';
include 'partials/header.php';
?>
<style>
.cert{max-width:760px;margin:24px auto;padding:36px 28px;text-align:center;background:#fff;border:10px double var(--color-primary);border-radius:var(--radius-lg);box-shadow:0 8px 28px rgba(0,0,0,.12)}
.cert__mascot{width:110px}
.cert h1{color:var(--color-primary);font-size:2.2rem;margin:8px 0}
.cert__name{font-size:2.4rem;font-weight:900;color:var(--color-secondary-dark);border-bottom:4px dashed var(--color-accent);display:inline-block;padding:0 20px;margin:12px 0}
.cert__stars{font-size:1.8rem;letter-spacing:6px}
.cert__actions{text-align:center;margin:16px 0}
@media print{.site-header,.site-footer,.cert__actions,.toast-container{display:none!important}.cert{box-shadow:none;margin:0}}
</style>
<main class="page-main" id="main-content">
  <div class="container">
    <section class="cert" id="cert" hidden>
      <img class="cert__mascot" src="assets/svg/mascot-kiki.svg" alt="Kiki">
      <h1>🎉 SERTIFIKAT 🎉</h1>
      <p>Dengan bangga diberikan kepada</p>
      <div class="cert__name" id="certName">Teman Hebat</div>
      <p>karena sudah belajar mengenal komputer di <strong>KOMPUTERKU</strong><br>dan mengumpulkan <strong id="certCount">0</strong> dari 12 lencana!</p>
      <div class="cert__stars" id="certStars" aria-hidden="true"></div>
      <p id="certDate"></p>
    </section>
    <p class="cert__actions" id="certActions" hidden><button class="btn btn--primary btn--lg" id="btnPrint" type="button">🖨️ Cetak Sertifikat</button></p>

    <section class="cert" id="certLocked" hidden>
      <img class="cert__mascot" src="assets/svg/mascot-kiki.svg" alt="Kiki">
      <h1>Sedikit lagi! 💪</h1>
      <p>Kumpulkan <strong>minimal 5 lencana</strong> dulu untuk mendapat sertifikat.<br>Kamu baru punya <strong id="lockCount">0</strong> lencana.</p>
      <p><a class="btn btn--primary btn--lg" href="learn.php">Ayo Belajar</a></p>
    </section>
  </div>
</main>
<?php include 'partials/footer.php'; ?>
<script type="module">
  import { storage } from './assets/js/storage.js';
  import { launchConfetti } from './assets/js/confetti.js';
  const NEED = 5, TOTAL = 12;
  const count = (storage.get('badges:v1', []) || []).length;
  if (count >= NEED) {
    const name = (storage.get('playerProfile:v1', {}) || {}).name || 'Teman Hebat';
    document.getElementById('certName').textContent = name;
    document.getElementById('certCount').textContent = count;
    document.getElementById('certStars').textContent = '⭐'.repeat(Math.max(1, Math.round(count / TOTAL * 5)));
    document.getElementById('certDate').textContent = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    document.getElementById('cert').hidden = false;
    document.getElementById('certActions').hidden = false;
    document.getElementById('btnPrint').addEventListener('click', () => window.print());
    launchConfetti();
  } else {
    document.getElementById('lockCount').textContent = count;
    document.getElementById('certLocked').hidden = false;
  }
</script>
</body>
</html>
