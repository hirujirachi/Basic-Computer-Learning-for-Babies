<?php
$pageTitle  = "Toko Bitty";
$pageCSS    = '';
$activePage = 'shop';
include 'partials/head.php';
include 'partials/header.php';
?>
<main class="page-main" id="main-content">
  <div class="container">

    <a href="index.php" class="back-link">← Beranda</a>

    <div class="page-header">
      <p class="page-header__eyebrow">🛍️ Toko</p>
      <h1 class="page-header__title">Toko Bitty</h1>
      <p class="page-header__subtitle">Hiasi Bitty dengan aksesori seru! Gunakan Byte Coin yang kamu dapat dari belajar.</p>
    </div>

    <div class="shop-layout">

      <!-- Left: Category tabs + item grid -->
      <div class="shop-main">

        <!-- Category tabs -->
        <div class="shop-tabs" role="tablist" aria-label="Kategori item">
          <button class="shop-tab is-active" data-category="all" role="tab" aria-selected="true">Semua</button>
          <button class="shop-tab" data-category="head" role="tab" aria-selected="false">👒 Kepala</button>
          <button class="shop-tab" data-category="face" role="tab" aria-selected="false">😊 Wajah</button>
          <button class="shop-tab" data-category="body" role="tab" aria-selected="false">⭐ Badan</button>
          <button class="shop-tab" data-category="casing" role="tab" aria-selected="false">🖥️ Desain</button>
          <button class="shop-tab" data-category="background" role="tab" aria-selected="false">🌄 Latar</button>
        </div>

        <!-- Item grid -->
        <div class="shop-grid" id="shopGrid" role="list" aria-label="Daftar item toko">
          <!-- Rendered by JS -->
        </div>

      </div>

      <!-- Right: Preview panel -->
      <aside class="shop-preview-panel" aria-label="Pratinjau Bitty">
        <div class="shop-preview-panel__title">Pratinjau Bitty</div>
        <div class="shop-preview-panel__bitty" id="shopPreviewBitty"></div>
        <div class="shop-preview-panel__balance" aria-live="polite" aria-label="Saldo Byte Coin kamu">
          <span aria-hidden="true">🪙</span>
          <span id="shopBalanceDisplay">0</span> Byte Coin
        </div>
        <p id="shopPreviewLabel" style="font-size:var(--font-size-xs);color:var(--color-text-muted);margin-bottom:var(--space-3);min-height:1.4em"></p>
        <div id="shopPreviewActions"></div>
      </aside>

    </div>

  </div>
</main>

<?php include 'partials/footer.php'; ?>

<script type="module">
import { SHOP_CATALOG, getItemById, PET_NAME, SLOT_CONFLICT_GROUPS } from './assets/js/pet-catalog.js';
import { Rewards } from './assets/js/rewards.js';
import { renderBitty, renderBittyThumb } from './assets/js/bitty-renderer.js';
import { BittyBehavior } from './assets/js/bitty-behavior.js';
import { showModal, showConfirm } from './assets/js/modal.js';

// ---- State ----
let currentCategory = 'all';
let previewItem = null;      // item being previewed (not yet owned)
let behavior = null;

// Get real equipped state
function getEquipped() {
  return Rewards.getState().equipped;
}

// Build a preview equipped state (apply the preview item)
function getPreviewEquipped() {
  if (!previewItem) return getEquipped();
  const eq = { ...getEquipped() };
  eq[previewItem.slot] = previewItem.id;
  return eq;
}

// ---- Balance display ----
function updateBalanceDisplay() {
  const el = document.getElementById('shopBalanceDisplay');
  if (el) el.textContent = Rewards.getBalance();
}

window.addEventListener('bc:changed', updateBalanceDisplay);

// ---- Category tabs ----
function initTabs() {
  document.querySelectorAll('.shop-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      currentCategory = btn.dataset.category;
      document.querySelectorAll('.shop-tab').forEach(b => {
        b.classList.toggle('is-active', b === btn);
        b.setAttribute('aria-selected', b === btn ? 'true' : 'false');
      });
      previewItem = null;
      renderGrid();
      renderPreviewPanel();
    });
  });
}

// ---- Item grid ----
function renderGrid() {
  const grid = document.getElementById('shopGrid');
  if (!grid) return;
  grid.innerHTML = '';

  const state = Rewards.getState();
  const balance = state.balance;
  const owned = state.owned;

  const items = currentCategory === 'all'
    ? SHOP_CATALOG
    : SHOP_CATALOG.filter(i => i.category === currentCategory);

  items.forEach(item => {
    const isOwned = owned.includes(item.id);
    const canAfford = balance >= item.price;
    const isPreviewing = previewItem && previewItem.id === item.id;

    const card = document.createElement('div');
    card.className = `shop-item-card${isOwned ? ' is-owned' : ''} ${!isOwned && !canAfford ? 'is-disabled' : ''} ${isPreviewing ? 'is-previewing' : ''}`;
    card.setAttribute('role', 'listitem');
    card.setAttribute('aria-label', `${item.name}${isOwned ? ' – dimiliki' : ''}`);
    card.setAttribute('tabindex', '0');

    // Mini preview SVG
    const previewDiv = document.createElement('div');
    previewDiv.className = 'shop-item-card__preview';
    const eq = buildPreviewForItem(item);
    renderBittyThumb(previewDiv, eq, 'happy');
    card.appendChild(previewDiv);

    // Name
    const nameEl = document.createElement('div');
    nameEl.className = 'shop-item-card__name';
    nameEl.textContent = item.name;
    card.appendChild(nameEl);

    // Price
    if (item.price > 0) {
      const priceEl = document.createElement('div');
      priceEl.className = 'shop-item-card__price';
      priceEl.innerHTML = `<span>🪙</span> ${item.price} BC`;
      card.appendChild(priceEl);
    } else {
      const freeEl = document.createElement('div');
      freeEl.className = 'shop-item-card__price';
      freeEl.textContent = 'Gratis';
      card.appendChild(freeEl);
    }

    // State badge
    const stateEl = document.createElement('div');
    stateEl.className = 'shop-item-card__state';
    if (isOwned) {
      stateEl.className += ' shop-item-card__state--owned';
      stateEl.textContent = '✓ Dimiliki';
    } else if (canAfford) {
      stateEl.className += ' shop-item-card__state--buy';
      stateEl.textContent = 'Beli';
    } else {
      stateEl.className += ' shop-item-card__state--locked';
      stateEl.textContent = 'Koin belum cukup';
    }
    card.appendChild(stateEl);

    // Click handler: preview (always) + buy
    card.addEventListener('click', () => onItemClick(item));
    card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') onItemClick(item); });

    grid.appendChild(card);
  });
}

/** Build a preview equipped object for a single item thumbnail */
function buildPreviewForItem(item) {
  const eq = { ...getEquipped() };
  eq[item.slot] = item.id;
  return eq;
}

// ---- Item click handler ----
function onItemClick(item) {
  const state = Rewards.getState();
  const isOwned = state.owned.includes(item.id);

  // Always preview
  previewItem = item;
  renderGrid();
  renderPreviewPanel(item, isOwned);
}

// ---- Preview panel ----
function renderPreviewPanel(item, isOwned) {
  const previewEl = document.getElementById('shopPreviewBitty');
  const labelEl   = document.getElementById('shopPreviewLabel');
  const actionsEl = document.getElementById('shopPreviewActions');
  if (!previewEl) return;

  // Behavior reactions — construct first, then set expression
  const eq = getPreviewEquipped();
  if (behavior) behavior.destroy();
  behavior = new BittyBehavior(previewEl, () => eq, { size: 'md', showBubble: false });
  // Show happy expression when item is previewed
  behavior.setExpression(item ? 'happy' : 'neutral');

  if (item) {
    if (labelEl) labelEl.textContent = `Pratinjau: ${item.name}`;

    // Actions
    if (actionsEl) {
      actionsEl.innerHTML = '';
      if (isOwned) {
        const btn = document.createElement('button');
        btn.className = 'btn btn--secondary btn--sm';
        btn.textContent = 'Sudah Dimiliki ✓';
        btn.disabled = true;
        actionsEl.appendChild(btn);
      } else {
        const balance = Rewards.getBalance();
        const canAfford = balance >= item.price;

        const buyBtn = document.createElement('button');
        buyBtn.className = `btn btn--primary btn--sm`;
        buyBtn.textContent = canAfford ? `Beli – 🪙 ${item.price} BC` : `Koin belum cukup`;
        buyBtn.disabled = !canAfford;
        buyBtn.addEventListener('click', () => onBuyItem(item));
        actionsEl.appendChild(buyBtn);

        if (!canAfford) {
          behavior.react('insufficient_coins');
        }
      }
    }
  } else {
    if (labelEl) labelEl.textContent = 'Klik item untuk melihat pratinjau!';
    if (actionsEl) actionsEl.innerHTML = '';
  }
}

// ---- Buy flow ----
function onBuyItem(item) {
  // Re-validate
  const state = Rewards.getState();
  if (state.owned.includes(item.id)) {
    showModal({ title: 'Sudah Dimiliki', body: `Kamu sudah punya ${item.name}!`, actions: [{ label: 'OK', variant: 'primary' }] });
    return;
  }
  if (state.balance < item.price) {
    behavior?.react('insufficient_coins');
    showModal({
      title: 'Koin Belum Cukup',
      body: `Koinmu belum cukup untuk membeli ${item.name}. Selesaikan lebih banyak aktivitas untuk mendapat Byte Coin!`,
      actions: [{ label: 'OK', variant: 'primary' }]
    });
    return;
  }

  // Confirm purchase
  showConfirm({
    title: `Beli ${item.name}?`,
    body: `Harga: 🪙 ${item.price} BC &bull; Saldo kamu: 🪙 ${state.balance} BC<br><br>Setelah membeli, kamu ingin langsung memakai atau nanti?`,
    confirmLabel: `Beli Sekarang`,
    cancelLabel: 'Batal',
    onConfirm: () => executePurchase(item),
  });
}

function executePurchase(item) {
  // Re-validate before executing
  const state = Rewards.getState();
  if (state.owned.includes(item.id) || state.balance < item.price) {
    renderGrid();
    renderPreviewPanel();
    return;
  }

  // Deduct coins and add to owned
  const success = Rewards.spendCoins(item.price);
  if (!success) return;
  Rewards.addOwnedItem(item.id);

  updateBalanceDisplay();
  behavior?.react('purchase');

  // Re-render grid
  previewItem = null;
  renderGrid();

  // Ask to equip now or later
  setTimeout(() => {
    showModal({
      title: `${item.name} Dibeli! 🎉`,
      body: 'Mau langsung pakai sekarang, atau nanti di My Bitty?',
      actions: [
        {
          label: 'Pasang Sekarang',
          variant: 'primary',
          onClick: () => {
            equipItemWithConflictCheck(item);
            renderPreviewPanel();
          }
        },
        {
          label: 'Nanti Saja',
          variant: 'ghost',
          onClick: () => {
            renderPreviewPanel();
          }
        }
      ]
    });
  }, 500);
}

function equipItemWithConflictCheck(item) {
  const state = Rewards.getState();
  const eq = { ...state.equipped };

  // Handle conflict groups (mutually exclusive glasses)
  for (const group of SLOT_CONFLICT_GROUPS) {
    if (group.includes(item.id)) {
      group.forEach(conflictId => {
        const conflictItem = getItemById(conflictId);
        if (conflictItem && conflictItem.id !== item.id) {
          if (eq[conflictItem.slot] === conflictItem.id) {
            eq[conflictItem.slot] = null;
          }
        }
      });
      break;
    }
  }

  eq[item.slot] = item.id;
  Rewards.saveState({ ...state, equipped: eq });
}

// ---- Init ----
function init() {
  updateBalanceDisplay();
  initTabs();
  renderGrid();

  // Initial preview (no item selected)
  const previewEl = document.getElementById('shopPreviewBitty');
  if (previewEl) {
    behavior = new BittyBehavior(previewEl, getEquipped, { size: 'md', showBubble: false });
    behavior.setExpression('happy');
    const labelEl = document.getElementById('shopPreviewLabel');
    if (labelEl) labelEl.textContent = 'Klik item untuk melihat pratinjau!';
  }

  // Cleanup
  window.addEventListener('pagehide', () => behavior?.destroy());
}

document.addEventListener('DOMContentLoaded', init);
</script>
</body>
</html>
