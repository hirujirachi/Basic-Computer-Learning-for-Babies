<?php
$pageTitle  = 'Beranda';
$pageCSS    = 'home.css';
$activePage = 'home';
include 'partials/head.php';
include 'partials/header.php';
?>
<main class="page-main" id="main-content">
  <div class="container">

    <!-- ===== HERO ===== -->
    <section class="hero" aria-label="Selamat datang di KOMPUTERKU">
      <div class="hero__text">
        <p class="hero__eyebrow">🎉 Selamat Datang!</p>
        <h1 class="hero__title">KOMPUTERKU</h1>
        <p class="hero__sub">Belajar tentang komputer dengan cara yang seru dan menyenangkan! Kenali bagian-bagian komputer, ikut kuis, dan perbaiki komputer yang rusak! 🚀</p>
        <a href="learn.php" class="btn btn--primary btn--lg">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 3l14 9-14 9V3z"/></svg>
          Mulai Belajar
        </a>
      </div>
      <div class="hero__mascot" aria-hidden="true">
        <!-- Friendly mascot: a cute robot/computer character -->
        <svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Maskot KOMPUTERKU">
          <!-- Body: big friendly monitor shape -->
          <rect x="60" y="40" width="200" height="150" rx="22" fill="#4ECDC4"/>
          <rect x="78" y="58" width="164" height="114" rx="12" fill="#FFF8F0"/>
          <!-- Screen face -->
          <!-- Eyes -->
          <circle cx="130" cy="100" r="18" fill="white"/>
          <circle cx="190" cy="100" r="18" fill="white"/>
          <circle cx="134" cy="102" r="10" fill="#2C3E50"/>
          <circle cx="194" cy="102" r="10" fill="#2C3E50"/>
          <!-- Eye shine -->
          <circle cx="137" cy="99" r="4" fill="white"/>
          <circle cx="197" cy="99" r="4" fill="white"/>
          <!-- Smile -->
          <path d="M 128 135 Q 160 158 192 135" stroke="#FF6B35" stroke-width="4" fill="none" stroke-linecap="round"/>
          <!-- Cheeks -->
          <circle cx="115" cy="130" r="12" fill="#FFB3A7" opacity=".5"/>
          <circle cx="205" cy="130" r="12" fill="#FFB3A7" opacity=".5"/>
          <!-- Antenna -->
          <line x1="160" y1="40" x2="160" y2="18" stroke="#FF6B35" stroke-width="4" stroke-linecap="round"/>
          <circle cx="160" cy="13" r="8" fill="#FFE66D"/>
          <!-- Stand/neck -->
          <rect x="145" y="190" width="30" height="20" rx="4" fill="#3ABDB5"/>
          <!-- Base -->
          <rect x="100" y="210" width="120" height="16" rx="8" fill="#FF6B35"/>
          <!-- Keyboard arm -->
          <rect x="40" y="260" width="240" height="40" rx="12" fill="#FFE66D"/>
          <!-- Keys on keyboard -->
          <rect x="58" y="270" width="20" height="12" rx="4" fill="white" opacity=".7"/>
          <rect x="88" y="270" width="20" height="12" rx="4" fill="white" opacity=".7"/>
          <rect x="118" y="270" width="20" height="12" rx="4" fill="white" opacity=".7"/>
          <rect x="148" y="270" width="20" height="12" rx="4" fill="white" opacity=".7"/>
          <rect x="178" y="270" width="20" height="12" rx="4" fill="white" opacity=".7"/>
          <rect x="208" y="270" width="20" height="12" rx="4" fill="white" opacity=".7"/>
          <!-- Mouse -->
          <ellipse cx="296" cy="275" rx="22" ry="30" fill="#4ECDC4"/>
          <line x1="296" y1="250" x2="296" y2="300" stroke="#FFF8F0" stroke-width="2"/>
          <!-- Stars decoration -->
          <text x="20" y="80" font-size="22" opacity=".5">✨</text>
          <text x="280" y="60" font-size="18" opacity=".5">⭐</text>
          <text x="10" y="200" font-size="16" opacity=".4">🌟</text>
        </svg>
      </div>
    </section>

    <!-- ===== BITTY HERO BLOCK ===== -->
    <section class="bitty-hero-block" aria-label="Bitty – teman virtual kamu">
      <div class="bitty-hero-block__pet">
        <div id="bittyHomeWidget" style="position:relative;display:flex;flex-direction:column;align-items:center;"></div>
      </div>
      <div class="bitty-hero-block__info">
        <h2 class="bitty-hero-block__name" id="bittyNameDisplay">Bitty</h2>
        <div class="bitty-hero-block__bc" aria-live="polite">
          <span class="bitty-hero-block__bc-icon" aria-hidden="true">🪙</span>
          <span class="bitty-hero-block__bc-amount" id="bittyHomeBcAmount">0</span>
          <span> Byte Coin</span>
        </div>
        <div class="bitty-hero-block__actions">
          <a href="my-bitty.php" class="btn btn--secondary">🐾 My Bitty</a>
          <a href="shop.php" class="btn btn--accent">🛍️ Toko Bitty</a>
        </div>
      </div>
    </section>

    <?php
    $mascotMessage = 'Halo teman! Aku Kiki! Ayo mulai petualangan belajar komputermu hari ini! Pilih menu di bawah ya! 🎉';
    $mascotSize    = 'md';
    $mascotTheme   = 'teal';
    $baseAssets    = '';
    include 'pages/partials/mascot-banner.php';
    ?>

    <!-- ===== MENU CARDS ===== -->
    <section class="menu-section" aria-label="Menu utama">
      <h2 class="menu-section__title">Mau belajar apa hari ini? 📚</h2>
      <div class="menu-grid" role="list">

        <a href="learn.php" class="menu-card menu-card--learn" role="listitem" aria-label="Mengenal Komputer – Pelajari bagian-bagian komputer">
          <div class="menu-card__icon" aria-hidden="true">📺</div>
          <h3 class="menu-card__title">Mengenal Komputer</h3>
          <p class="menu-card__desc">Pelajari bagian-bagian komputer: monitor, keyboard, mouse, dan PC!</p>
          <div class="menu-card__badge" id="badgeLearn"></div>
          <span class="menu-card__arrow" aria-hidden="true">→</span>
        </a>

        <a href="extra-hardware.php" class="menu-card menu-card--extra" role="listitem" aria-label="Perangkat Tambahan – Kenali speaker, printer, webcam, dan lainnya">
          <div class="menu-card__icon" aria-hidden="true">🔌</div>
          <h3 class="menu-card__title">Perangkat Tambahan</h3>
          <p class="menu-card__desc">Kenali speaker, printer, headset, webcam, dan flashdisk!</p>
          <div class="menu-card__badge" id="badgeExtra"></div>
          <span class="menu-card__arrow" aria-hidden="true">→</span>
        </a>

        <a href="games.php" class="menu-card menu-card--games" role="listitem" aria-label="Kuis dan Permainan – Uji pengetahuanmu lewat kuis dan permainan seru">
          <div class="menu-card__icon" aria-hidden="true">🎮</div>
          <h3 class="menu-card__title">Kuis &amp; Permainan</h3>
          <p class="menu-card__desc">Ikuti kuis seru dan main berbagai permainan edukatif tentang komputer!</p>
          <div class="menu-card__badge" id="badgeGames"></div>
          <span class="menu-card__arrow" aria-hidden="true">→</span>
        </a>

        <a href="fmc.php" class="menu-card menu-card--fmc" role="listitem" aria-label="Fix My Computer – Perbaiki komputer yang rusak">
          <div class="menu-card__icon" aria-hidden="true">🔧</div>
          <h3 class="menu-card__title">Fix My Computer</h3>
          <p class="menu-card__desc">Komputer rusak! Bantu perbaiki monitor, keyboard, mouse, dan PC-nya!</p>
          <div class="menu-card__badge" id="badgeFmc"></div>
          <span class="menu-card__arrow" aria-hidden="true">→</span>
        </a>

      </div>
    </section>

    <!-- Fun facts strip -->
    <div class="fun-facts" aria-label="Fakta seru">
      <div class="fun-fact">
        <span class="fun-fact__emoji" aria-hidden="true">🖥️</span>
        <span class="fun-fact__label">Monitor menampilkan gambar</span>
      </div>
      <div class="fun-fact">
        <span class="fun-fact__emoji" aria-hidden="true">⌨️</span>
        <span class="fun-fact__label">Keyboard untuk mengetik</span>
      </div>
      <div class="fun-fact">
        <span class="fun-fact__emoji" aria-hidden="true">🖱️</span>
        <span class="fun-fact__label">Mouse untuk menunjuk</span>
      </div>
      <div class="fun-fact">
        <span class="fun-fact__emoji" aria-hidden="true">💻</span>
        <span class="fun-fact__label">PC adalah otak komputer</span>
      </div>
    </div>

  </div>

  <section class="badge-section container" aria-label="Koleksi Lencana">
    <h2 class="badge-section__title">🏅 Koleksi Lencana</h2>
    <div class="badge-shelf" id="badgeShelf" aria-label="Koleksi lencana yang dimiliki"></div>
    <p style="text-align:center;margin-top:20px"><a href="certificate.php" class="btn btn--primary btn--lg">🎓 Ambil Sertifikatku</a></p>
  </section>

</main>

<?php include 'partials/footer.php'; ?>

<script type="module">
  import { storage } from './assets/js/storage.js';
  import { renderBadgeShelf, isBadgeUnlocked } from './assets/js/narration-badges.js';
  import { Rewards, } from './assets/js/rewards.js';
  import { PET_NAME } from './assets/js/pet-catalog.js';
  import { initBittyWidget } from './assets/js/bitty-behavior.js';

  const learnDone = storage.isLearnDone();
  const fmcDone   = storage.isFmcDone();
  const fmcCount  = storage.countFmcDone();
  const quizBest  = storage.getQuizBest();

  const badgeLearn = document.getElementById('badgeLearn');
  const badgeGames = document.getElementById('badgeGames');
  const badgeFmc   = document.getElementById('badgeFmc');
  const badgeExtra = document.getElementById('badgeExtra');

  if (learnDone) {
    badgeLearn.innerHTML = '<span class="badge badge--success">✓ Selesai</span>';
  } else {
    const step = storage.getLearnStep();
    if (step > 0) {
      badgeLearn.innerHTML = `<span class="badge badge--warning">Langkah ${step + 1}/5</span>`;
    }
  }

  if (quizBest !== null) {
    badgeGames.innerHTML = `<span class="badge badge--success">🏆 Kuis Terbaik: ${quizBest}/5</span>`;
  }

  if (fmcDone) {
    badgeFmc.innerHTML = '<span class="badge badge--success">✓ Semua Diperbaiki!</span>';
  } else if (fmcCount > 0) {
    badgeFmc.innerHTML = `<span class="badge badge--warning">${fmcCount}/4 Diperbaiki</span>`;
  }

  if (isBadgeUnlocked('extra_explored')) {
    badgeExtra.innerHTML = '<span class="badge badge--success">✓ Sudah Dijelajahi</span>';
  }

  renderBadgeShelf(document.getElementById('badgeShelf'));

  // ---- Bitty home widget ----
  const bittyWidget = document.getElementById('bittyHomeWidget');
  if (bittyWidget) {
    // Show Bitty name from catalog
    const nameEl = document.getElementById('bittyNameDisplay');
    if (nameEl) nameEl.textContent = PET_NAME;

    // Show current BC
    const bcEl = document.getElementById('bittyHomeBcAmount');
    if (bcEl) bcEl.textContent = Rewards.getBalance();

    // Listen for bc:changed and update display
    window.addEventListener('bc:changed', (e) => {
      if (bcEl) bcEl.textContent = e.detail.balance;
    });

    // Init behavior widget with greeting
    const behavior = initBittyWidget(bittyWidget, { size: 'lg', greeting: true });

    // Cleanup on page hide
    window.addEventListener('pagehide', () => behavior?.destroy());
  }
</script>
</body>
</html>
