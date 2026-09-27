/** Minimal, no-autoplay sound layer. Nothing plays until the visitor opts in
 * via the sound toggle, and the choice is remembered locally. All clips are
 * short synthesized tones (no audio assets to ship/host) — enough for game-
 * like UI feedback without adding a media pipeline. */

const STORAGE_KEY = "kilow:sound";

export function getSoundPreference(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(STORAGE_KEY) === "on";
}

export function setSoundPreference(on: boolean) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, on ? "on" : "off");
}

type ToneKind = "click" | "hover" | "enter" | "transition";

const TONES: Record<ToneKind, { freq: number; duration: number; type: OscillatorType }> = {
  click: { freq: 720, duration: 0.06, type: "sine" },
  hover: { freq: 960, duration: 0.04, type: "sine" },
  enter: { freq: 220, duration: 0.5, type: "triangle" },
  transition: { freq: 340, duration: 0.28, type: "sine" },
};

let ctx: AudioContext | null = null;

function getContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const AudioCtx = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtx) return null;
  if (!ctx) ctx = new AudioCtx();
  return ctx;
}

/** Fire a short UI tone. No-ops silently if sound is off or Web Audio is
 * unavailable/blocked — this must never throw into an interaction handler. */
export function playTone(kind: ToneKind) {
  if (!getSoundPreference()) return;
  const audioCtx = getContext();
  if (!audioCtx) return;

  if (audioCtx.state === "suspended") void audioCtx.resume();

  const { freq, duration, type } = TONES[kind];
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.05, audioCtx.currentTime + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
  osc.connect(gain).connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + duration + 0.02);
}
