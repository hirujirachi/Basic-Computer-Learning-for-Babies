<?php
// partials/header.php
// Usage: include with $activePage set to 'home'|'learn'|'games'|'fmc'
if (!isset($activePage)) $activePage = '';

// All pages are at the project root level
$baseAssets = '';

$navItems = [
  ['href' => 'index.php',          'key' => 'home',       'label' => 'Beranda'],
  ['href' => 'learn.php',          'key' => 'learn',      'label' => 'Mengenal Komputer'],
  ['href' => 'extra-hardware.php', 'key' => 'extra',      'label' => 'Perangkat Tambahan'],
  ['href' => 'games.php',          'key' => 'games',      'label' => 'Kuis &amp; Permainan'],
  ['href' => 'fmc.php',            'key' => 'fmc',        'label' => 'Fix My Computer'],
  ['href' => 'shop.php',           'key' => 'shop',       'label' => 'Toko Bitty'],
  ['href' => 'my-bitty.php',       'key' => 'my-bitty',   'label' => 'My Bitty'],
];
?>
<header class="site-header" role="banner">
  <div class="container site-header__inner">
    <a href="<?= $baseAssets ?>index.php" class="site-logo" aria-label="KOMPUTERKU – Beranda">
      <svg viewBox="0 0 40 40" aria-hidden="true">
        <rect x="4" y="6" width="32" height="22" rx="4" fill="#4ECDC4"/>
        <rect x="8" y="10" width="24" height="14" rx="2" fill="#FFF8F0"/>
        <rect x="2" y="28" width="36" height="4" rx="2" fill="#FF6B35"/>
        <rect x="15" y="32" width="10" height="4" rx="1" fill="#FF6B35"/>
        <circle cx="20" cy="17" r="4" fill="#FFE66D"/>
        <text x="20" y="20.5" text-anchor="middle" font-size="6" fill="#2C3E50" font-weight="bold" font-family="sans-serif">K</text>
      </svg>
      KOMPUTERKU
    </a>

    <button class="nav-toggle" id="navToggle" aria-label="Buka menu navigasi" aria-expanded="false" aria-controls="siteNav">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="6" width="18" height="2.5" rx="1.25" fill="currentColor"/>
        <rect x="3" y="11" width="18" height="2.5" rx="1.25" fill="currentColor"/>
        <rect x="3" y="16" width="18" height="2.5" rx="1.25" fill="currentColor"/>
      </svg>
    </button>

    <nav class="site-nav" id="siteNav" role="navigation" aria-label="Navigasi utama">
      <?php foreach ($navItems as $item): ?>
      <a href="<?= $item['href'] ?>"
         class="nav-link<?= $activePage === $item['key'] ? ' is-active' : '' ?>"
         <?= $activePage === $item['key'] ? 'aria-current="page"' : '' ?>>
        <?= $item['label'] ?>
      </a>
      <?php endforeach; ?>
    </nav>

    <div class="site-header__actions">
      <div id="playerPill"></div>
      <button class="btn-sound" id="btnSound" aria-label="Aktifkan/nonaktifkan suara" title="Suara">
        <svg id="iconSoundOn" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
        </svg>
        <svg id="iconSoundOff" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
          <line x1="23" y1="9" x2="17" y2="15"/>
          <line x1="17" y1="9" x2="23" y2="15"/>
        </svg>
      </button>
    </div>
  </div>
</header>

<div class="toast-container" id="toastContainer" aria-live="polite" aria-atomic="false"></div>

<script type="module">
  import { storage } from './<?= $baseAssets ?>assets/js/storage.js';
  import { initSound } from './<?= $baseAssets ?>assets/js/sound.js';
  import { initPlayerProfile } from './<?= $baseAssets ?>assets/js/player-profile.js';
  import { initPetHUD } from './<?= $baseAssets ?>assets/js/pet-hud.js';

  initPlayerProfile();
  initPetHUD();

  // Nav toggle
  const toggle = document.getElementById('navToggle');
  const nav    = document.getElementById('siteNav');
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open);
  });

  // Close nav when link is clicked
  nav.querySelectorAll('.nav-link').forEach(a => {
    a.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Sound toggle
  const { toggle: toggleSound, isMuted } = initSound(storage);
  const btnSound = document.getElementById('btnSound');
  const iconOn  = document.getElementById('iconSoundOn');
  const iconOff = document.getElementById('iconSoundOff');

  function updateSoundUI() {
    const muted = isMuted();
    iconOn.style.display  = muted ? 'none' : '';
    iconOff.style.display = muted ? '' : 'none';
    btnSound.setAttribute('aria-label', muted ? 'Aktifkan suara' : 'Nonaktifkan suara');
  }

  updateSoundUI();
  btnSound.addEventListener('click', () => { toggleSound(); updateSoundUI(); });
</script>
