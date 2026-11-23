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

<script type="module">
  import { storage } from './<?= $baseAssets ?>assets/js/storage.js';
  import { showConfirm } from './<?= $baseAssets ?>assets/js/modal.js';

  document.getElementById('btnResetProgress').addEventListener('click', () => {
    showConfirm({
      title: 'Reset Progres?',
      body: 'Semua progres belajar, permainan, dan perbaikan akan dihapus. Apakah kamu yakin?',
      confirmLabel: 'Ya, Reset',
      cancelLabel: 'Batal',
      onConfirm: () => {
        storage.resetAll();
        window.location.reload();
      }
    });
  });
</script>
