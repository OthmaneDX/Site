import { create } from "zustand";

interface UiState {
  // Defaults to true (open) everywhere except the home page: EntrySequence
  // is the only thing that ever sets this false, and only while it's
  // actively gating that one page. Every other route needs its content
  // reachable from the very first render, with no gate to clear it.
  hasEntered: boolean;
  setHasEntered: (v: boolean) => void;
  soundEnabled: boolean;
  setSoundEnabled: (v: boolean) => void;
}

/** Only state genuinely shared across unrelated components lives here —
 * per-section animation state (scroll progress, hover, etc.) stays local
 * to the component/hook that owns it. */
export const useUiStore = create<UiState>((set) => ({
  hasEntered: true,
  setHasEntered: (v) => set({ hasEntered: v }),
  soundEnabled: false,
  setSoundEnabled: (v) => set({ soundEnabled: v }),
}));
