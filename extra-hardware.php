<?php
$pageTitle  = 'Perangkat Tambahan';
$pageCSS    = 'extras.css';
$activePage = 'extra';
include 'partials/head.php';
include 'partials/header.php';
?>
<main class="page-main" id="main-content">
  <div class="container">

    <a href="index.php" class="back-link" aria-label="Kembali ke beranda">
      ← Beranda
    </a>

    <div class="page-header">
      <p class="page-header__eyebrow">🔌 Perangkat Tambahan</p>
      <h1 class="page-header__title">Kenalan Yuk!</h1>
      <p class="page-header__subtitle">Ada banyak perangkat seru yang bisa disambungkan ke komputer. Yuk kenali lebih lanjut!</p>
    </div>

    <?php
    $mascotMessage = 'Hei! Aku Kiki! Hari ini kita akan mengenal 5 perangkat keren yang bisa disambung ke komputer! Siap? 🚀';
    $mascotSize    = 'md';
    $mascotTheme   = 'teal';
    include 'pages/partials/mascot-banner.php';
    ?>

    <div class="extra-hw-narration" id="narrationContainer"></div>

    <div id="hintContainer"></div>

    <section aria-label="Daftar perangkat tambahan">
      <div class="extra-hw-grid" id="hwGrid">

        <!-- SPEAKER -->
        <article class="hw-card" id="card-speaker" aria-label="Speaker">
          <div class="hw-card__illus">
            <svg viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg" aria-label="Ilustrasi speaker">
              <rect x="20" y="20" width="70" height="100" rx="12" fill="#4ECDC4"/>
              <rect x="30" y="30" width="50" height="50" rx="25" fill="#3ABDB5"/>
              <circle cx="55" cy="55" r="20" fill="#2E9E96"/>
              <circle cx="55" cy="55" r="12" fill="#1A7A73"/>
              <circle cx="55" cy="55" r="5" fill="#FFE66D"/>
              <rect x="38" y="92" width="34" height="10" rx="5" fill="#3ABDB5"/>
              <circle cx="55" cy="97" r="3" fill="#FFE66D"/>
              <path class="speaker-wave speaker-wave-1" d="M 100 45 Q 115 55 100 65" stroke="#FF6B35" stroke-width="3.5" fill="none" stroke-linecap="round"/>
              <path class="speaker-wave speaker-wave-2" d="M 103 35 Q 125 55 103 75" stroke="#FF6B35" stroke-width="3" fill="none" stroke-linecap="round" opacity=".6"/>
              <path class="speaker-wave speaker-wave-3" d="M 107 25 Q 135 55 107 85" stroke="#FF6B35" stroke-width="2" fill="none" stroke-linecap="round" opacity=".35"/>
            </svg>
          </div>
          <div class="hw-card__body">
            <div class="hw-card__tags">
              <span class="hw-tag hw-tag--output">Output</span>
              <span class="hw-tag">Suara</span>
            </div>
            <h2 class="hw-card__title">🔊 Speaker</h2>
            <p class="hw-card__desc">Speaker adalah alat yang mengeluarkan suara dari komputer. Dengan speaker, kita bisa mendengarkan musik, video, dan suara dari permainan!</p>
            <div class="hw-card__example">
              <span class="hw-card__example-label">Contoh:</span>
              <span>Saat kamu menonton kartun di komputer, suaranya keluar lewat speaker.</span>
            </div>
            <button class="btn btn--secondary btn--sm hw-card__flow-btn" data-card="speaker" aria-label="Lihat animasi aliran suara Speaker">
              ▶ Lihat Aliran IO
            </button>
          </div>
          <!-- IO flow panel -->
          <div class="hw-io-flow hw-io-flow--hidden" id="flow-speaker" aria-label="Aliran IO Speaker" aria-hidden="true">
            <div class="hw-io-flow__inner">
              <div class="hw-io-node hw-io-node--pc">💻 PC</div>
              <div class="hw-io-flow__arrow io-arrow-animated">→</div>
              <div class="hw-io-node hw-io-node--device">🔊 Speaker</div>
              <div class="hw-io-flow__arrow io-arrow-animated" style="animation-delay:.2s">→</div>
              <div class="hw-io-node hw-io-node--out">👂 Telinga</div>
            </div>
            <p class="hw-io-flow__label">Data audio keluar dari PC → menuju Speaker → suara terdengar di telinga.</p>
          </div>
        </article>

        <!-- PRINTER -->
        <article class="hw-card" id="card-printer" aria-label="Printer">
          <div class="hw-card__illus">
            <svg viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg" aria-label="Ilustrasi printer">
              <rect x="10" y="45" width="120" height="60" rx="12" fill="#9B59B6"/>
              <rect x="20" y="55" width="100" height="40" rx="8" fill="#7D3C98"/>
              <rect x="30" y="62" width="60" height="6" rx="3" fill="#E8D5F5"/>
              <rect x="30" y="74" width="40" height="6" rx="3" fill="#E8D5F5" opacity=".6"/>
              <circle cx="102" cy="68" r="7" fill="#2ECC71"/>
              <circle cx="102" cy="68" r="4" fill="#27AE60"/>
              <rect x="40" y="30" width="60" height="20" rx="6" fill="#BDC3C7"/>
              <rect x="47" y="34" width="46" height="12" rx="3" fill="#ECF0F1"/>
              <rect class="printer-paper" x="30" y="100" width="80" height="28" rx="5" fill="#ECF0F1" stroke="#BDC3C7" stroke-width="1.5"/>
              <rect x="38" y="107" width="64" height="4" rx="2" fill="#9B59B6" opacity=".5"/>
              <rect x="38" y="115" width="50" height="4" rx="2" fill="#9B59B6" opacity=".35"/>
            </svg>
          </div>
          <div class="hw-card__body">
            <div class="hw-card__tags">
              <span class="hw-tag hw-tag--output">Output</span>
              <span class="hw-tag">Cetak</span>
            </div>
            <h2 class="hw-card__title">🖨️ Printer</h2>
            <p class="hw-card__desc">Printer adalah alat yang mencetak tulisan atau gambar dari komputer ke kertas. Dengan printer, tulisan di layar bisa jadi nyata di kertas!</p>
            <div class="hw-card__example">
              <span class="hw-card__example-label">Contoh:</span>
              <span>Kalau kamu ingin cetak tugas sekolah, kamu pakai printer!</span>
            </div>
            <button class="btn btn--secondary btn--sm hw-card__flow-btn" data-card="printer" aria-label="Lihat animasi aliran cetak Printer">
              ▶ Lihat Aliran IO
            </button>
          </div>
          <div class="hw-io-flow hw-io-flow--hidden" id="flow-printer" aria-label="Aliran IO Printer" aria-hidden="true">
            <div class="hw-io-flow__inner">
              <div class="hw-io-node hw-io-node--pc">💻 PC</div>
              <div class="hw-io-flow__arrow io-arrow-animated">→</div>
              <div class="hw-io-node hw-io-node--device">🖨️ Printer</div>
              <div class="hw-io-flow__arrow io-arrow-animated" style="animation-delay:.2s">→</div>
              <div class="hw-io-node hw-io-node--out">📄 Kertas</div>
            </div>
            <p class="hw-io-flow__label">Data dari PC → dikirim ke Printer → dicetak menjadi kertas nyata.</p>
          </div>
        </article>

        <!-- HEADSET / MIC -->
        <article class="hw-card" id="card-headset" aria-label="Headset dan Mikrofon">
          <div class="hw-card__illus">
            <svg viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg" aria-label="Ilustrasi headset">
              <path d="M 20 70 Q 20 25 70 25 Q 120 25 120 70" stroke="#FF6B35" stroke-width="8" fill="none" stroke-linecap="round"/>
              <rect x="10" y="68" width="20" height="36" rx="10" fill="#FF6B35"/>
              <rect x="14" y="72" width="12" height="28" rx="6" fill="#E55A25"/>
              <rect x="110" y="68" width="20" height="36" rx="10" fill="#FF6B35"/>
              <rect x="114" y="72" width="12" height="28" rx="6" fill="#E55A25"/>
              <rect x="62" y="98" width="16" height="30" rx="8" fill="#FFE66D" stroke="#F5D700" stroke-width="2"/>
              <ellipse cx="70" cy="130" rx="12" ry="5" fill="#FFE66D" opacity=".5"/>
              <circle cx="70" cy="108" r="4" fill="#FF6B35"/>
            </svg>
          </div>
          <div class="hw-card__body">
            <div class="hw-card__tags">
              <span class="hw-tag hw-tag--io">I/O</span>
              <span class="hw-tag">Suara</span>
              <span class="hw-tag">Bicara</span>
            </div>
            <h2 class="hw-card__title">🎧 Headset &amp; Mic</h2>
            <p class="hw-card__desc">Headset adalah kombinasi earphone dan mikrofon. Earphone untuk mendengar, mikrofon untuk berbicara. Sangat berguna untuk video call atau bermain game bersama teman!</p>
            <div class="hw-card__example">
              <span class="hw-card__example-label">Contoh:</span>
              <span>Saat belajar online dengan guru, kamu bisa pakai headset supaya suaranya jelas.</span>
            </div>
            <button class="btn btn--secondary btn--sm hw-card__flow-btn" data-card="headset" aria-label="Lihat animasi aliran IO Headset">
              ▶ Lihat Aliran IO
            </button>
          </div>
          <div class="hw-io-flow hw-io-flow--hidden" id="flow-headset" aria-label="Aliran IO Headset" aria-hidden="true">
            <div class="hw-io-flow__inner hw-io-flow__inner--vertical">
              <div class="hw-io-row">
                <div class="hw-io-node hw-io-node--in">🗣️ Suaramu</div>
                <div class="hw-io-flow__arrow io-arrow-animated">→</div>
                <div class="hw-io-node hw-io-node--device">🎤 Mikrofon</div>
                <div class="hw-io-flow__arrow io-arrow-animated" style="animation-delay:.2s">→</div>
                <div class="hw-io-node hw-io-node--pc">💻 PC</div>
              </div>
              <div class="hw-io-divider">↕ dua arah</div>
              <div class="hw-io-row">
                <div class="hw-io-node hw-io-node--pc">💻 PC</div>
                <div class="hw-io-flow__arrow io-arrow-animated" style="animation-delay:.4s">→</div>
                <div class="hw-io-node hw-io-node--device">🎧 Earphone</div>
                <div class="hw-io-flow__arrow io-arrow-animated" style="animation-delay:.6s">→</div>
                <div class="hw-io-node hw-io-node--out">👂 Telingamu</div>
              </div>
            </div>
            <p class="hw-io-flow__label">Headset adalah perangkat I/O: mikrofon memasukkan suara (Input), earphone mengeluarkan suara (Output).</p>
          </div>
        </article>

        <!-- WEBCAM -->
        <article class="hw-card" id="card-webcam" aria-label="Webcam">
          <div class="hw-card__illus">
            <svg viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg" aria-label="Ilustrasi webcam">
              <rect x="38" y="30" width="64" height="52" rx="14" fill="#2C3E50"/>
              <rect x="44" y="36" width="52" height="40" rx="10" fill="#34495E"/>
              <circle cx="70" cy="56" r="18" fill="#2C3E50" stroke="#4ECDC4" stroke-width="3"/>
              <circle cx="70" cy="56" r="11" fill="#1A252F"/>
              <circle cx="70" cy="56" r="6" fill="#4ECDC4"/>
              <circle cx="73" cy="53" r="2.5" fill="white" opacity=".7"/>
              <circle cx="96" cy="40" r="4" fill="#E74C3C" class="webcam-rec-light"/>
              <rect x="55" y="84" width="30" height="12" rx="4" fill="#34495E"/>
              <rect x="38" y="96" width="64" height="10" rx="5" fill="#2C3E50"/>
              <path d="M 60 106 Q 70 118 70 125" stroke="#95A5A6" stroke-width="3" fill="none" stroke-linecap="round"/>
            </svg>
          </div>
          <div class="hw-card__body">
            <div class="hw-card__tags">
              <span class="hw-tag hw-tag--input">Input</span>
              <span class="hw-tag">Kamera</span>
            </div>
            <h2 class="hw-card__title">📷 Webcam</h2>
            <p class="hw-card__desc">Webcam adalah kamera kecil yang dipasang di atas monitor. Webcam menangkap gambar wajahmu supaya orang lain bisa melihatmu saat video call!</p>
            <div class="hw-card__example">
              <span class="hw-card__example-label">Contoh:</span>
              <span>Saat zoom meeting dengan teman, webcam menampilkan wajahmu di layar mereka.</span>
            </div>
            <button class="btn btn--secondary btn--sm hw-card__flow-btn" data-card="webcam" aria-label="Lihat animasi aliran kamera Webcam">
              ▶ Lihat Aliran IO
            </button>
          </div>
          <div class="hw-io-flow hw-io-flow--hidden" id="flow-webcam" aria-label="Aliran IO Webcam" aria-hidden="true">
            <div class="hw-io-flow__inner">
              <div class="hw-io-node hw-io-node--in">👤 Wajahmu</div>
              <div class="hw-io-flow__arrow io-arrow-animated">→</div>
              <div class="hw-io-node hw-io-node--device">📷 Webcam</div>
              <div class="hw-io-flow__arrow io-arrow-animated" style="animation-delay:.2s">→</div>
              <div class="hw-io-node hw-io-node--pc">💻 PC</div>
              <div class="hw-io-flow__arrow io-arrow-animated" style="animation-delay:.4s">→</div>
              <div class="hw-io-node hw-io-node--out">🖥️ Layar Teman</div>
            </div>
            <p class="hw-io-flow__label">Webcam menangkap gambar wajahmu (Input) → data dikirim ke PC → ditampilkan ke layar teman.</p>
          </div>
        </article>

        <!-- FLASHDISK -->
        <article class="hw-card" id="card-flashdisk" aria-label="Flashdisk">
          <div class="hw-card__illus">
            <svg viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg" aria-label="Ilustrasi flashdisk">
              <rect x="35" y="30" width="70" height="80" rx="14" fill="#FFE66D" stroke="#F5D700" stroke-width="2.5"/>
              <rect x="50" y="85" width="40" height="20" rx="6" fill="#F5D700"/>
              <rect x="58" y="90" width="24" height="10" rx="3" fill="#2C3E50" opacity=".25"/>
              <rect x="47" y="40" width="46" height="34" rx="8" fill="#2C3E50"/>
              <rect x="53" y="46" width="34" height="22" rx="5" fill="#34495E"/>
              <circle cx="70" cy="57" r="7" fill="#4ECDC4"/>
              <circle cx="70" cy="57" r="4" fill="#2E9E96"/>
              <rect x="62" y="78" width="16" height="6" rx="3" fill="#2ECC71" class="flashdisk-led"/>
              <circle cx="38" cy="38" r="6" fill="none" stroke="#F5D700" stroke-width="2" stroke-dasharray="4 3"/>
              <circle cx="102" cy="38" r="6" fill="none" stroke="#F5D700" stroke-width="2" stroke-dasharray="4 3"/>
            </svg>
          </div>
          <div class="hw-card__body">
            <div class="hw-card__tags">
              <span class="hw-tag hw-tag--storage">Penyimpanan</span>
              <span class="hw-tag">Portabel</span>
            </div>
            <h2 class="hw-card__title">💾 Flashdisk</h2>
            <p class="hw-card__desc">Flashdisk adalah alat penyimpanan data yang kecil dan bisa dibawa ke mana-mana. Kamu bisa menyimpan foto, video, dan dokumen di dalamnya!</p>
            <div class="hw-card__example">
              <span class="hw-card__example-label">Contoh:</span>
              <span>Kalau mau kirim tugas ke guru lewat flashdisk, tinggal colok ke port USB komputer!</span>
            </div>
            <button class="btn btn--secondary btn--sm hw-card__flow-btn" data-card="flashdisk" aria-label="Lihat animasi aliran data Flashdisk">
              ▶ Lihat Aliran IO
            </button>
          </div>
          <div class="hw-io-flow hw-io-flow--hidden" id="flow-flashdisk" aria-label="Aliran IO Flashdisk" aria-hidden="true">
            <div class="hw-io-flow__inner hw-io-flow__inner--vertical">
              <div class="hw-io-row">
                <div class="hw-io-node hw-io-node--pc">💻 PC</div>
                <div class="hw-io-flow__arrow io-arrow-animated">→</div>
                <div class="hw-io-node hw-io-node--device">💾 Flashdisk</div>
                <span class="hw-io-label-sm">Simpan data</span>
              </div>
              <div class="hw-io-divider">↕ dua arah</div>
              <div class="hw-io-row">
                <div class="hw-io-node hw-io-node--device">💾 Flashdisk</div>
                <div class="hw-io-flow__arrow io-arrow-animated" style="animation-delay:.3s">→</div>
                <div class="hw-io-node hw-io-node--pc">💻 PC Lain</div>
                <span class="hw-io-label-sm">Buka data</span>
              </div>
            </div>
            <p class="hw-io-flow__label">Flashdisk adalah penyimpanan portabel I/O: data bisa masuk (simpan) dan keluar (buka) dari komputer mana saja.</p>
          </div>
        </article>

      </div>
    </section>

    <div class="hw-minigame-cta">
      <div class="hw-minigame-cta__inner">
        <span class="hw-minigame-cta__icon" aria-hidden="true">🎮</span>
        <div>
          <h2 class="hw-minigame-cta__title">Siap Main?</h2>
          <p class="hw-minigame-cta__desc">Uji pemahamanmu tentang perangkat tambahan lewat permainan cocok-cocokan seru!</p>
        </div>
        <a href="extra-match.php" class="btn btn--primary">Mainkan Sekarang →</a>
      </div>
    </div>

    <section class="badge-section" aria-label="Koleksi Lencana">
      <h2 class="badge-section__title">🏅 Koleksi Lencana</h2>
      <div class="badge-shelf" id="badgeShelf" aria-label="Koleksi lencana yang dimiliki"></div>
    </section>

  </div>
</main>

<?php include 'partials/footer.php'; ?>

<script type="module">
  import { initNarrationController, renderBadgeShelf, unlockBadge } from './assets/js/narration-badges.js';
  import { initHintButton } from './assets/js/player-profile.js';

  const narrationLines = [
    'Hei teman! Tahukah kamu, komputer punya banyak perangkat tambahan yang bisa disambungkan? 🔌',
    'Perangkat tambahan dibagi menjadi dua: perangkat INPUT dan perangkat OUTPUT.',
    'Perangkat INPUT adalah perangkat yang mengirim informasi ke komputer, seperti webcam dan mikrofon.',
    'Perangkat OUTPUT adalah perangkat yang mengeluarkan informasi dari komputer, seperti speaker dan printer.',
    'Ada juga perangkat penyimpanan seperti flashdisk yang bisa menyimpan dan memindahkan data!',
    'Yuk, kita kenali satu per satu! Tekan tombol "Lihat Aliran IO" di setiap kartu untuk melihat animasi! 👇',
  ];

  const narrationEl = document.getElementById('narrationContainer');
  initNarrationController(narrationEl, narrationLines);

  initHintButton(
    document.getElementById('hintContainer'),
    'Tekan tombol "▶ Lihat Aliran IO" di setiap kartu untuk melihat bagaimana data bergerak antara perangkat dan komputer. Perangkat INPUT mengirim data ke komputer, OUTPUT mengeluarkan data dari komputer!'
  );

  document.querySelectorAll('.hw-card__flow-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const cardId = btn.dataset.card;
      const flowEl = document.getElementById(`flow-${cardId}`);
      if (!flowEl) return;

      const isOpen = !flowEl.classList.contains('hw-io-flow--hidden');

      document.querySelectorAll('.hw-io-flow').forEach(f => {
        f.classList.add('hw-io-flow--hidden');
        f.setAttribute('aria-hidden', 'true');
      });
      document.querySelectorAll('.hw-card__flow-btn').forEach(b => {
        b.textContent = '▶ Lihat Aliran IO';
        b.classList.remove('btn--primary');
        b.classList.add('btn--secondary');
      });

      if (!isOpen) {
        flowEl.classList.remove('hw-io-flow--hidden');
        flowEl.setAttribute('aria-hidden', 'false');
        btn.textContent = '▼ Sembunyikan';
        btn.classList.remove('btn--secondary');
        btn.classList.add('btn--primary');
        flowEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  });

  renderBadgeShelf(document.getElementById('badgeShelf'));

  unlockBadge('extra_explored');

  setTimeout(() => renderBadgeShelf(document.getElementById('badgeShelf')), 500);

  window.addEventListener('pagehide', () => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
  });
</script>
</body>
</html>
