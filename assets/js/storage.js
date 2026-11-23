/**
 * storage.js — Namespaced localStorage helper
 * All keys are prefixed with 'komputerku:'
 * Handles errors gracefully (private mode, quota, etc.)
 */

const NS = 'komputerku';
const VERSION = 1;

function safe(fn, fallback = null) {
  try { return fn(); } catch (e) { return fallback; }
}

export const storage = {
  get(key, def = null) {
    return safe(() => {
      const raw = localStorage.getItem(`${NS}:${key}`);
      if (raw === null) return def;
      return JSON.parse(raw);
    }, def);
  },

  set(key, value) {
    safe(() => localStorage.setItem(`${NS}:${key}`, JSON.stringify(value)));
  },

  remove(key) {
    safe(() => localStorage.removeItem(`${NS}:${key}`));
  },

  resetAll() {
    safe(() => {
      const keys = Object.keys(localStorage).filter(k => k.startsWith(`${NS}:`));
      keys.forEach(k => localStorage.removeItem(k));
    });
  },

  // Convenience shortcuts
  getLearnStep()    { return this.get('learn:step', 0); },
  setLearnStep(v)   { this.set('learn:step', v); },
  isLearnDone()     { return this.get('learn:done', false); },
  setLearnDone(v)   { this.set('learn:done', v); },

  getQuizBest()     { return this.get('quiz:best', null); },
  setQuizBest(v)    { this.set('quiz:best', v); },

  getMouseBest()    { return this.get('mouse:best', null); },
  setMouseBest(v)   { this.set('mouse:best', v); },

  getFmcItem(item)  { return this.get(`fmc:${item}`, false); },
  setFmcItem(item, v) { this.set(`fmc:${item}`, v); },
  isFmcDone()       { return this.get('fmc:done', false); },
  setFmcDone(v)     { this.set('fmc:done', v); },

  isSoundMuted()    { return this.get('sound:muted', false); },
  setSoundMuted(v)  { this.set('sound:muted', v); },

  getFmcAll() {
    return {
      keyboard: this.getFmcItem('keyboard'),
      mouse:    this.getFmcItem('mouse'),
      monitor:  this.getFmcItem('monitor'),
      pc:       this.getFmcItem('pc'),
    };
  },
  countFmcDone() {
    const s = this.getFmcAll();
    return Object.values(s).filter(Boolean).length;
  },
};
