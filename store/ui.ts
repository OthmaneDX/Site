import { create } from "zustand";

interface UiState {
  hasEntered: boolean;
  setHasEntered: (v: boolean) => void;
  soundEnabled: boolean;
  setSoundEnabled: (v: boolean) => void;
  activeGameIndex: number;
  setActiveGameIndex: (i: number) => void;
}

/** Only state genuinely shared across unrelated components lives here —
 * per-section animation state (scroll progress, hover, etc.) stays local
 * to the component/hook that owns it. */
export const useUiStore = create<UiState>((set) => ({
  hasEntered: false,
  setHasEntered: (v) => set({ hasEntered: v }),
  soundEnabled: false,
  setSoundEnabled: (v) => set({ soundEnabled: v }),
  activeGameIndex: 0,
  setActiveGameIndex: (i) => set({ activeGameIndex: i }),
}));
