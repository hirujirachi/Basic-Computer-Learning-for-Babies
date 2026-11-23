<?php
if (!isset($mascotMessage)) $mascotMessage = 'Halo! Aku Kiki, temanmu belajar komputer! 🎉';
if (!isset($mascotSize))    $mascotSize    = 'md';
if (!isset($mascotTheme))   $mascotTheme   = 'teal';
if (!isset($baseAssets))    $baseAssets    = '';
?>
<div class="mascot-banner mascot-banner--<?= htmlspecialchars($mascotTheme, ENT_QUOTES, 'UTF-8') ?> mascot-banner--<?= htmlspecialchars($mascotSize, ENT_QUOTES, 'UTF-8') ?>" role="complementary" aria-label="Kiki maskot">
  <div class="mascot-banner__figure" aria-hidden="true">
    <img src="<?= htmlspecialchars($baseAssets, ENT_QUOTES, 'UTF-8') ?>assets/svg/mascot-kiki.svg" alt="" width="96" height="106" class="mascot-banner__img">
  </div>
  <div class="mascot-banner__bubble">
    <span class="mascot-banner__name">Kiki</span>
    <p class="mascot-banner__message" data-base-message="<?= htmlspecialchars($mascotMessage, ENT_QUOTES, 'UTF-8') ?>"><?= htmlspecialchars($mascotMessage, ENT_QUOTES, 'UTF-8') ?></p>
  </div>
</div>

<script type="module">
  (function () {
    function readPlayerName() {
      try {
        const raw = localStorage.getItem('komputerku:playerProfile:v1');
        if (raw) {
          const p = JSON.parse(raw);
          if (p && typeof p.name === 'string' && p.name.trim()) return p.name.trim();
        }
      } catch (e) {}
      return '';
    }

    function personalizeMessage(base, name) {
      if (!name) return base;
      if (/^Halo teman!/i.test(base)) return base.replace(/^Halo teman!/i, `Halo, ${name}!`);
      if (/^Halo!/i.test(base))       return base.replace(/^Halo!/i, `Halo, ${name}!`);
      if (/^Hei!/i.test(base))        return base.replace(/^Hei!/i, `Hei, ${name}!`);
      return `Halo, ${name}! ${base}`;
    }

    function applyGreetings() {
      const name = readPlayerName();
      document.querySelectorAll('.mascot-banner__message[data-base-message]').forEach(el => {
        el.textContent = personalizeMessage(el.dataset.baseMessage, name);
      });
    }

    applyGreetings();
    document.addEventListener('playerProfileUpdated', applyGreetings);
    window.addEventListener('storage', (e) => {
      if (e.key === 'komputerku:playerProfile:v1') applyGreetings();
    });
  })();
</script>
