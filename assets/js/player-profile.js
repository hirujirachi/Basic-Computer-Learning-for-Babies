import { storage } from './storage.js';
import { unlockBadge } from './narration-badges.js';

const PROFILE_KEY = 'playerProfile:v1';

const AVATARS = [
  { id: 'robot',   emoji: '🤖', label: 'Robot' },
  { id: 'cat',     emoji: '🐱', label: 'Kucing' },
  { id: 'rocket',  emoji: '🚀', label: 'Roket' },
  { id: 'star',    emoji: '⭐', label: 'Bintang' },
  { id: 'dino',    emoji: '🦕', label: 'Dino' },
  { id: 'owl',     emoji: '🦉', label: 'Burung Hantu' },
  { id: 'fox',     emoji: '🦊', label: 'Rubah' },
  { id: 'penguin', emoji: '🐧', label: 'Pinguin' },
];

function loadProfile() {
  return storage.get(PROFILE_KEY, { name: '', avatarId: 'robot' });
}

function saveProfile(profile) {
  storage.set(PROFILE_KEY, profile);
  document.dispatchEvent(new CustomEvent('playerProfileUpdated', { detail: profile }));
}

function getAvatarEmoji(id) {
  return (AVATARS.find(a => a.id === id) || AVATARS[0]).emoji;
}

function renderPill(profile) {
  const pill = document.getElementById('playerPill');
  if (!pill) return;
  const name  = profile.name || 'Pemain';
  const emoji = getAvatarEmoji(profile.avatarId);
  pill.innerHTML = `
    <button class="player-pill" id="btnEditProfile" aria-label="Profil pemain: ${name}. Klik untuk ubah.">
      <span class="player-pill__avatar" aria-hidden="true">${emoji}</span>
      <span class="player-pill__name">${name}</span>
      <span class="player-pill__edit" aria-hidden="true">✏️</span>
    </button>
  `;
  pill.querySelector('#btnEditProfile').addEventListener('click', openProfileModal);
}

function openProfileModal() {
  let overlay = document.getElementById('profileModalOverlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'profileModalOverlay';
    overlay.className = 'modal-overlay is-hidden';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Ubah Profil Pemain');
    document.body.appendChild(overlay);
    overlay.addEventListener('click', e => { if (e.target === overlay) closeProfileModal(); });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && !overlay.classList.contains('is-hidden')) closeProfileModal();
    });
  }

  const profile = loadProfile();

  overlay.innerHTML = `
    <div class="modal profile-modal">
      <h2 class="modal__title">👤 Profil Pemain</h2>
      <label class="profile-modal__label" for="inputPlayerName">Nama Kamu</label>
      <input class="profile-modal__input" id="inputPlayerName" type="text" maxlength="20"
             placeholder="Masukkan namamu…" value="${profile.name}" autocomplete="off">
      <p class="profile-modal__label">Pilih Avatarmu</p>
      <div class="profile-modal__avatars" role="group" aria-label="Pilih avatar">
        ${AVATARS.map(a => `
          <button class="profile-modal__avatar-btn${a.id === profile.avatarId ? ' is-selected' : ''}"
                  data-avatar="${a.id}" aria-label="${a.label}" aria-pressed="${a.id === profile.avatarId}">
            ${a.emoji}
          </button>
        `).join('')}
      </div>
      <div class="modal__actions">
        <button class="btn btn--primary" id="btnSaveProfile">Simpan</button>
        <button class="btn btn--ghost" id="btnCancelProfile">Batal</button>
      </div>
    </div>
  `;

  overlay.classList.remove('is-hidden');

  const avatarBtns = overlay.querySelectorAll('.profile-modal__avatar-btn');
  avatarBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      avatarBtns.forEach(b => { b.classList.remove('is-selected'); b.setAttribute('aria-pressed', 'false'); });
      btn.classList.add('is-selected');
      btn.setAttribute('aria-pressed', 'true');
    });
  });

  overlay.querySelector('#btnSaveProfile').addEventListener('click', () => {
    const name       = overlay.querySelector('#inputPlayerName').value.trim();
    const selAvatar  = overlay.querySelector('.profile-modal__avatar-btn.is-selected');
    const avatarId   = selAvatar ? selAvatar.dataset.avatar : 'robot';
    const updated    = { name: name || 'Pemain', avatarId };
    saveProfile(updated);
    if (name) unlockBadge('named_player');
    renderPill(updated);
    closeProfileModal();
  });

  overlay.querySelector('#btnCancelProfile').addEventListener('click', closeProfileModal);

  setTimeout(() => overlay.querySelector('#inputPlayerName')?.focus(), 60);
}

function closeProfileModal() {
  const overlay = document.getElementById('profileModalOverlay');
  if (overlay) overlay.classList.add('is-hidden');
}

export function initHintButton(containerEl, hintText) {
  if (!containerEl) return;

  containerEl.innerHTML = `
    <div class="hint-wrapper">
      <button class="btn btn--ghost btn--sm hint-btn" id="btnHint" aria-expanded="false" aria-controls="hintBox">
        💡 Bantuan
      </button>
      <div class="hint-box hint-box--hidden" id="hintBox" role="status" aria-live="polite" aria-hidden="true">
        <span class="hint-box__icon" aria-hidden="true">💡</span>
        <p class="hint-box__text">${hintText}</p>
      </div>
    </div>
  `;

  const btn = containerEl.querySelector('#btnHint');
  const box = containerEl.querySelector('#hintBox');

  btn.addEventListener('click', () => {
    const isOpen = !box.classList.contains('hint-box--hidden');
    if (isOpen) {
      box.classList.add('hint-box--hidden');
      box.setAttribute('aria-hidden', 'true');
      btn.setAttribute('aria-expanded', 'false');
      btn.innerHTML = '💡 Bantuan';
      btn.classList.remove('hint-btn--active');
    } else {
      box.classList.remove('hint-box--hidden');
      box.setAttribute('aria-hidden', 'false');
      btn.setAttribute('aria-expanded', 'true');
      btn.innerHTML = '✕ Tutup Bantuan';
      btn.classList.add('hint-btn--active');
    }
  });
}

export function updateHintText(containerEl, newText) {
  if (!containerEl) return;
  const textEl = containerEl.querySelector('.hint-box__text');
  if (textEl) textEl.textContent = newText;
}

export function initPlayerProfile() {
  const container = document.getElementById('playerPill');
  if (!container) return;
  const profile = loadProfile();
  renderPill(profile);
}
