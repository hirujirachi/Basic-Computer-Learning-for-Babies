/**
 * rewards.js — Central Rewards module for the Bitty pet system.
 *
 * Exposes:
 *   Rewards.claim(rewardId, context?)  → { granted, amount, alreadyClaimed }
 *   Rewards.getBalance()               → number
 *   Rewards.getState()                 → full pet state object
 *   Rewards.saveState(state)           → persist state
 *   Rewards.loadState()                → load & validate state from localStorage
 *   Rewards.spendCoins(amount)         → boolean (false if insufficient)
 *   Rewards.addOwnedItem(id)
 *   Rewards.setEquipped(slot, id)
 *   Rewards.resetPetData()
 *
 * Emits CustomEvent 'bc:changed' on window when balance changes.
 * Emits CustomEvent 'bitty:reaction' on window for behavior triggers.
 */

import { storage } from './storage.js';
import {
  REWARD_TABLE,
  getRewardById,
  getDefaultOwnedIds,
  getDefaultEquipped,
} from './pet-catalog.js';

// ---- Storage key ----
const PET_KEY = 'pet:v1';

// ---- Simple integrity checksum (djb2-style) ----
function computeChecksum(state) {
  const data = `${state.balance}|${JSON.stringify(state.ledger)}|${JSON.stringify(state.owned)}`;
  let hash = 5381;
  for (let i = 0; i < data.length; i++) {
    hash = ((hash << 5) + hash) ^ data.charCodeAt(i);
    hash = hash >>> 0; // keep 32-bit unsigned
  }
  return hash.toString(16);
}

// ---- Default / empty state ----
function defaultState() {
  const ledger = {};
  REWARD_TABLE.forEach(r => { ledger[r.id] = false; });
  const state = {
    version: 1,
    balance: 0,
    ledger,
    quizHighTier: 0,     // 0=none, 3, 4, or 5
    quizAmountReceived: 0,
    owned: [...getDefaultOwnedIds()],
    equipped: { ...getDefaultEquipped() },
    checksum: '',
  };
  state.checksum = computeChecksum(state);
  return state;
}

// ---- Reconstruct a safe balance from the ledger (anti-tamper recovery) ----
function reconstructBalance(ledger, quizAmountReceived) {
  let total = 0;
  REWARD_TABLE.forEach(r => {
    // Skip quiz sub-tiers – they are handled via quizAmountReceived
    if (r.id === 'quiz_3' || r.id === 'quiz_4' || r.id === 'quiz_5') return;
    if (ledger[r.id]) total += r.amount;
  });
  total += (quizAmountReceived || 0);
  return total;
}

// ---- Load and validate state ----
function loadState() {
  const raw = storage.get(PET_KEY, null);

  // No data yet — first run
  if (!raw || typeof raw !== 'object') {
    return defaultState();
  }

  // Migration: ensure all ledger keys exist
  const def = defaultState();
  const state = { ...def, ...raw };
  state.ledger = { ...def.ledger, ...(raw.ledger || {}) };
  state.owned = Array.isArray(raw.owned) ? raw.owned : [...def.owned];
  state.equipped = { ...def.equipped, ...(raw.equipped || {}) };

  // Integrity check
  const expected = computeChecksum(state);
  if (state.checksum !== expected) {
    // Reconstruct balance from ledger; keep owned/equipped as-is (may have been legitimately extended)
    const safeBalance = reconstructBalance(state.ledger, state.quizAmountReceived);
    state.balance = safeBalance;
    state.checksum = computeChecksum(state);
    // Save corrected state
    storage.set(PET_KEY, state);
    // Notify UI
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('bc:tamper-recovered'));
    }, 0);
  }

  return state;
}

// ---- Persist state ----
function saveState(state) {
  state.checksum = computeChecksum(state);
  storage.set(PET_KEY, state);
}

// ---- Emit bc:changed event ----
function emitBcChanged(newBalance, delta) {
  window.dispatchEvent(new CustomEvent('bc:changed', {
    detail: { balance: newBalance, delta }
  }));
}

// ---- Emit bitty:reaction event ----
function emitReaction(type, payload = {}) {
  window.dispatchEvent(new CustomEvent('bitty:reaction', {
    detail: { type, ...payload }
  }));
}

// ---- Public API ----
export const Rewards = {

  /**
   * Claim a reward by id.
   * Returns { granted: boolean, amount: number, alreadyClaimed: boolean }
   */
  claim(rewardId) {
    const def = getRewardById(rewardId);
    if (!def) return { granted: false, amount: 0, alreadyClaimed: false };

    const state = loadState();

    // ---- Quiz special rule ----
    if (rewardId === 'quiz_3' || rewardId === 'quiz_4' || rewardId === 'quiz_5') {
      const tierMap = { quiz_3: 3, quiz_4: 4, quiz_5: 5 };
      const amountMap = { quiz_3: 10, quiz_4: 15, quiz_5: 25 };
      const incomingTier = tierMap[rewardId];
      const currentTier = state.quizHighTier || 0;

      if (incomingTier <= currentTier) {
        // No improvement — nothing granted
        return { granted: false, amount: 0, alreadyClaimed: true };
      }

      // Grant only the difference
      const totalForNewTier = amountMap[rewardId];
      const totalForOldTier = currentTier > 0 ? amountMap[`quiz_${currentTier}`] : 0;
      const delta = totalForNewTier - totalForOldTier;

      state.quizHighTier = incomingTier;
      state.quizAmountReceived = totalForNewTier;
      // Mark old tiers as claimed, new tier as claimed
      if (incomingTier >= 3) state.ledger['quiz_3'] = true;
      if (incomingTier >= 4) state.ledger['quiz_4'] = true;
      if (incomingTier >= 5) state.ledger['quiz_5'] = true;

      state.balance += delta;
      saveState(state);
      emitBcChanged(state.balance, delta);
      emitReaction('earn_coins', { amount: delta });
      return { granted: true, amount: delta, alreadyClaimed: false };
    }

    // ---- Regular rewards ----
    if (state.ledger[rewardId]) {
      return { granted: false, amount: 0, alreadyClaimed: true };
    }

    state.ledger[rewardId] = true;
    state.balance += def.amount;
    saveState(state);
    emitBcChanged(state.balance, def.amount);
    emitReaction('earn_coins', { amount: def.amount });
    return { granted: true, amount: def.amount, alreadyClaimed: false };
  },

  /** Get current BC balance */
  getBalance() {
    return loadState().balance;
  },

  /** Get full pet state */
  getState() {
    return loadState();
  },

  /** Save updated state */
  saveState(state) {
    saveState(state);
  },

  /**
   * Spend coins for a purchase.
   * Returns true if successful, false if insufficient balance.
   * Emits bc:changed on success.
   */
  spendCoins(amount) {
    if (typeof amount !== 'number' || amount <= 0) return false;
    const state = loadState();
    if (state.balance < amount) return false;
    state.balance -= amount;
    saveState(state);
    emitBcChanged(state.balance, -amount);
    return true;
  },

  /** Add an owned item by id */
  addOwnedItem(itemId) {
    const state = loadState();
    if (!state.owned.includes(itemId)) {
      state.owned.push(itemId);
      saveState(state);
    }
  },

  /** Set an equipped item for a slot */
  setEquipped(slot, itemId) {
    const state = loadState();
    state.equipped[slot] = itemId;
    saveState(state);
  },

  /** Check if an item is owned */
  isOwned(itemId) {
    return loadState().owned.includes(itemId);
  },

  /** Reset all pet data to defaults */
  resetPetData() {
    const fresh = defaultState();
    storage.set(PET_KEY, fresh);
    emitBcChanged(0, 0);
  },
};
