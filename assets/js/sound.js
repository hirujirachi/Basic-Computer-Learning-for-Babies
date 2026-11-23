/**
 * sound.js — Web Audio API sound effects + mute toggle
 * Returns helpers used by the header and game pages
 */

let audioCtx = null;
let _muted = false;

function getCtx() {
  if (!audioCtx) {
    try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); }
    catch (e) { return null; }
  }
  return audioCtx;
}

function beep({ frequency = 440, type = 'sine', duration = 0.12, volume = 0.4, delay = 0 } = {}) {
  if (_muted) return;
  const ctx = getCtx();
  if (!ctx) return;
  try {
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime + delay);
    gain.gain.setValueAtTime(0, ctx.currentTime + delay);
    gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + delay + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);
    osc.start(ctx.currentTime + delay);
    osc.stop(ctx.currentTime + delay + duration + 0.01);
  } catch (e) { /* silent */ }
}

export const sounds = {
  correct()  { beep({ frequency: 523, duration: .15, volume: .4 }); beep({ frequency: 659, duration: .15, volume: .4, delay: .15 }); },
  wrong()    { beep({ frequency: 220, type: 'sawtooth', duration: .2, volume: .3 }); },
  click()    { beep({ frequency: 800, type: 'sine', duration: .07, volume: .25 }); },
  success()  {
    [523, 659, 784, 1046].forEach((f, i) => beep({ frequency: f, duration: .18, volume: .35, delay: i * .12 }));
  },
  advance()  { beep({ frequency: 440, duration: .1, volume: .3 }); beep({ frequency: 550, duration: .1, volume: .3, delay: .1 }); },
  tick()     { beep({ frequency: 1000, duration: .04, volume: .15 }); },
  pop()      { beep({ frequency: 900, type: 'sine', duration: .08, volume: .3 }); },
};

export function initSound(storageHelper) {
  _muted = storageHelper.isSoundMuted();

  return {
    isMuted: () => _muted,
    toggle: () => {
      _muted = !_muted;
      storageHelper.setSoundMuted(_muted);
    },
    play: (name) => sounds[name]?.(),
  };
}
