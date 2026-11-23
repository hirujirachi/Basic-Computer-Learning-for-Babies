/**
 * modal.js — Reusable modal / confirm dialog helper
 * Usage: showModal({title, body, actions: [{label, variant, onClick}]})
 *        showConfirm({title, body, confirmLabel, cancelLabel, onConfirm, onCancel})
 */

function getOrCreateOverlay() {
  let overlay = document.getElementById('globalModalOverlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'globalModalOverlay';
    overlay.className = 'modal-overlay is-hidden';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.innerHTML = `<div class="modal" id="globalModal"></div>`;
    document.body.appendChild(overlay);

    // Close on overlay click
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });
    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !overlay.classList.contains('is-hidden')) closeModal();
    });
  }
  return overlay;
}

export function showModal({ icon = '', title = '', body = '', actions = [], onClose } = {}) {
  const overlay = getOrCreateOverlay();
  const modal   = overlay.querySelector('#globalModal');

  overlay._onClose = onClose;

  modal.innerHTML = `
    ${icon ? `<div class="modal__icon" aria-hidden="true">${icon}</div>` : ''}
    ${title ? `<h2 class="modal__title">${title}</h2>` : ''}
    ${body  ? `<p class="modal__body">${body}</p>` : ''}
    <div class="modal__actions">
      ${actions.map((a, i) =>
        `<button class="btn btn--${a.variant || 'primary'}" data-action="${i}">${a.label}</button>`
      ).join('')}
    </div>
  `;

  actions.forEach((a, i) => {
    modal.querySelector(`[data-action="${i}"]`).addEventListener('click', () => {
      closeModal();
      a.onClick?.();
    });
  });

  overlay.classList.remove('is-hidden');
  // Focus first button
  const firstBtn = modal.querySelector('.btn');
  if (firstBtn) setTimeout(() => firstBtn.focus(), 50);
}

export function showConfirm({ title, body, confirmLabel = 'Ya', cancelLabel = 'Batal', onConfirm, onCancel } = {}) {
  showModal({
    title,
    body,
    actions: [
      { label: confirmLabel, variant: 'primary', onClick: onConfirm },
      { label: cancelLabel,  variant: 'ghost',   onClick: onCancel },
    ],
  });
}

export function closeModal() {
  const overlay = document.getElementById('globalModalOverlay');
  if (!overlay) return;
  overlay.classList.add('is-hidden');
  overlay._onClose?.();
}

/**
 * showToast — lightweight notification
 */
export function showToast(message, type = 'info', duration = 2000) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.textContent = message;
  toast.setAttribute('role', 'status');
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity .3s ease';
    setTimeout(() => toast.remove(), 400);
  }, duration);
}
