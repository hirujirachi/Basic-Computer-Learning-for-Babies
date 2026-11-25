<?php
// partials/footer.php
// All pages are at the project root level
$baseAssets = '';
?>
<footer class="site-footer" role="contentinfo">
  <div class="container">
    <p>© 2024 KOMPUTERKU &nbsp;·&nbsp; Belajar Komputer Menyenangkan! 🎉</p>
    <button class="btn-reset-progress" id="btnResetProgress" type="button">
      Reset Semua Progres
    </button>
  </div>
</footer>

<script type="module" src="<?= $baseAssets ?>assets/js/kiki-buddy.js"></script>

<script type="module">
  import { storage } from './<?= $baseAssets ?>assets/js/storage.js';
  import { showConfirm } from './<?= $baseAssets ?>assets/js/modal.js';
  import { Rewards } from './<?= $baseAssets ?>assets/js/rewards.js';

  document.getElementById('btnResetProgress').addEventListener('click', () => {
    showConfirm({
      title: 'Reset Semua Data?',
      body: 'Semua progres belajar, permainan, perbaikan, Byte Coin, dan data Bitty (aksesori, koin) akan dihapus. Apakah kamu yakin?',
      confirmLabel: 'Ya, Reset Semua',
      cancelLabel: 'Batal',
      onConfirm: () => {
        storage.resetAll();
        Rewards.resetPetData();
        window.location.reload();
      }
    });
  });
</script>
