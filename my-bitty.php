<?php
$pageTitle  = 'My Bitty';
$pageCSS    = '';
$activePage = 'my-bitty';
include 'partials/head.php';
include 'partials/header.php';
?>
<main class="page-main" id="main-content">
  <div class="container">

    <a href="index.php" class="back-link">← Beranda</a>

    <div class="page-header">
      <p class="page-header__eyebrow">🐾 Kustomisasi</p>
      <h1 class="page-header__title">My Bitty</h1>
      <p class="page-header__subtitle">Hiasi dan ubah tampilan Bitty sesukamu!</p>
    </div>

    <div class="my-bitty-layout">

      <!-- Left: Preview -->
      <aside class="my-bitty-preview" aria-label="Pratinjau Bitty">
        <div class="my-bitty-preview__title">Bitty kamu sekarang</div>
        <div class="my-bitty-preview__bitty" id="myBittyPreview"></div>
        <div style="display:flex;align-items:center;justify-content:center;gap:var(--space-2);font-weight:800;font-size:var(--font-size-md);margin-bottom:var(--space-4)" aria-live="polite">
          <span aria-hidden="true">🪙</span>
          <span id="myBittyBalance">0</span> Byte Coin
        </div>
        <button class="btn btn--ghost btn--sm" id="btnLepasAll" style="width:100%;margin-bottom:var(--space-3)">
          🗑️ Lepas Semua Aksesori
        </button>
        <a href="shop.php" class="btn btn--primary btn--sm" style="width:100%;display:flex">
          🛍️ Ke Toko Bitty
        </a>
      </aside>

      <!-- Right: Collections -->
      <div id="myBittyCollections">
        <!-- Rendered by JS -->
      </div>

    </div>

  </div>
</main>

<?php include 'partials/footer.php'; ?>

<script type="module">
import { SHOP_CATALOG, getItemById, PET_NAME, SLOT_CONFLICT_GROUPS } from './assets/js/pet-catalog.js';
import { Rewards } from './assets/js/rewards.js';
import { renderBitty } from './assets/js/bitty-renderer.js';
import { BittyBehavior } from './assets/js/bitty-behavior.js';
import { showConfirm } from './assets/js/modal.js';

// Category display names (Indonesian)
const CATEGORY_LABELS = {
  head: '👒 Aksesori Kepala',
  face: '😊 Aksesori Wajah',
  body: '⭐ Aksesori Badan',
  casing: '🖥️ Desain Kasing',
  background: '🌄 Latar Belakang',
};

// Category order
const CATEGORY_ORDER = ['head', 'face', 'body', 'casing', 'background'];

// Item emoji for display (fallback)
const ITEM_EMOJI = {
  head_wizard_hat: '🎩',
  head_crown: '👑',
  head_bow: '🎀',
  head_baseball_cap: '🧢',
  head_headphones: '🎧',
  face_round_glasses: '👓',
  face_sunglasses: '🕶️',
  face_blush: '🌸',
  face_mustache: '👨',
  face_star_stickers: '⭐',
  body_lightning_stickers: '⚡',
  body_heart_stickers: '❤️',
  body_star_stickers: '🌟',
  casing_default: '🖥️',
  casing_blue: '💙',
  casing_pink: '🩷',
  casing_mint: '🌿',
  casing_galaxy: '🌌',
  bg_default: '⬜',
  bg_bedroom: '🛏️',
  bg_computer_room: '💻',
  bg_garden: '🌸',
  bg_space: '🚀',
  bg_underwater: '🐠',
};

let behavior = null;

// ---- Get real equipped ----
function getEquipped() {
  return Rewards.getState().equipped;
}

// ---- Update preview ----
function updatePreview() {
  const el = document.getElementById('myBittyPreview');
  if (!el) return;

  if (behavior) behavior.destroy();
  behavior = new BittyBehavior(el, getEquipped, { size: 'lg', showBubble: false });
  behavior.setExpression('happy');
}

// ---- Update balance display ----
function updateBalanceDisplay() {
  const el = document.getElementById('myBittyBalance');
  if (el) el.textContent = Rewards.getBalance();
}

window.addEventListener('bc:changed', updateBalanceDisplay);

// ---- Render all collections ----
function renderCollections() {
  const container = document.getElementById('myBittyCollections');
  if (!container) return;
  container.innerHTML = '';

  const state = Rewards.getState();
  const owned = state.owned;
  const equipped = state.equipped;

  CATEGORY_ORDER.forEach(category => {
    const ownedItems = SHOP_CATALOG.filter(i => i.category === category && owned.includes(i.id));
    const allItems = SHOP_CATALOG.filter(i => i.category === category);
    const lockedCount = allItems.length - ownedItems.length;

    const section = document.createElement('div');
    section.className = 'my-bitty-section';
    section.setAttribute('aria-label', CATEGORY_LABELS[category]);

    const title = document.createElement('h2');
    title.className = 'my-bitty-section__title';
    title.textContent = CATEGORY_LABELS[category];
    section.appendChild(title);

    if (ownedItems.length === 0) {
      // Empty state
      const empty = document.createElement('div');
      empty.className = 'my-bitty-empty';
      empty.innerHTML = `
        <div class="my-bitty-empty__icon" aria-hidden="true">🔒</div>
        <div class="my-bitty-empty__text">Belum ada item! Kunjungi toko untuk membeli.</div>
        <a href="shop.php" class="btn btn--primary btn--sm">🛍️ Ke Toko</a>
      `;
      section.appendChild(empty);
    } else {
      const grid = document.createElement('div');
      grid.className = 'my-bitty-grid';
      section.appendChild(grid);

      ownedItems.forEach(item => {
        const isEquipped = equipped[item.slot] === item.id;
        const card = document.createElement('div');
        card.className = `my-bitty-item${isEquipped ? ' is-equipped' : ''}`;
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-pressed', isEquipped ? 'true' : 'false');
        card.setAttribute('aria-label', `${item.name}${isEquipped ? ' – sedang dipakai' : ''}`);

        const emoji = ITEM_EMOJI[item.id] || '🎁';
        card.innerHTML = `
          <div class="my-bitty-item__icon" aria-hidden="true">${emoji}</div>
          <div class="my-bitty-item__name">${item.name}</div>
        `;

        card.addEventListener('click', () => onToggleEquip(item));
        card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') onToggleEquip(item); });

        grid.appendChild(card);
      });

      // Locked hint
      if (lockedCount > 0) {
        const hint = document.createElement('div');
        hint.className = 'my-bitty-item';
        hint.style.opacity = '0.45';
        hint.style.cursor = 'default';
        hint.setAttribute('aria-label', `${lockedCount} item belum dibeli di toko`);
        hint.innerHTML = `
          <div class="my-bitty-item__icon" aria-hidden="true">🔒</div>
          <div class="my-bitty-item__name">+${lockedCount} di toko</div>
        `;
        hint.addEventListener('click', () => window.location.href = 'shop.php');
        grid.appendChild(hint);
      }
    }

    container.appendChild(section);
  });
}

// ---- Toggle equip/unequip ----
function onToggleEquip(item) {
  const state = Rewards.getState();
  const eq = { ...state.equipped };

  const currentlyEquipped = eq[item.slot] === item.id;

  if (currentlyEquipped) {
    // Unequip — but don't unequip free defaults for casing/background
    if ((item.slot === 'casing' || item.slot === 'background') && item.price === 0) {
      // Default items stay equipped — just ignore
      return;
    }
    eq[item.slot] = null;
  } else {
    // Equip — handle conflict groups
    for (const group of SLOT_CONFLICT_GROUPS) {
      if (group.includes(item.id)) {
        group.forEach(conflictId => {
          const conflictItem = getItemById(conflictId);
          if (conflictItem && conflictItem.id !== item.id && eq[conflictItem.slot] === conflictItem.id) {
            eq[conflictItem.slot] = null;
          }
        });
        break;
      }
    }
    eq[item.slot] = item.id;
  }

  Rewards.saveState({ ...state, equipped: eq });
  renderCollections();
  updatePreview();
  behavior?.react('purchase');
}

// ---- Lepas Semua ----
function onLepasAll() {
  showConfirm({
    title: 'Lepas Semua Aksesori?',
    body: 'Semua aksesori akan dilepas, kecuali kasing dan latar bawaan. Kamu tetap bisa memasangnya kembali kapan saja.',
    confirmLabel: 'Ya, Lepas Semua',
    cancelLabel: 'Batal',
    onConfirm: () => {
      const state = Rewards.getState();
      const eq = { ...state.equipped };
      // Keep casing and background defaults, reset all others
      eq.head = null;
      eq.face_glasses = null;
      eq.face_blush = null;
      eq.face_mustache = null;
      eq.face_sticker = null;
      eq.body_sticker = null;
      Rewards.saveState({ ...state, equipped: eq });
      renderCollections();
      updatePreview();
    }
  });
}

// ---- Init ----
function init() {
  updateBalanceDisplay();
  updatePreview();
  renderCollections();

  document.getElementById('btnLepasAll')?.addEventListener('click', onLepasAll);

  window.addEventListener('pagehide', () => behavior?.destroy());
}

document.addEventListener('DOMContentLoaded', init);
</script>
</body>
</html>
