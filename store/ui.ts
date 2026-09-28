import { create } from "zustand";

interface UiState {
  soundEnabled: boolean;
  setSoundEnabled: (v: boolean) => void;
}

/** Only state genuinely shared across unrelated components lives here —
 * per-section animation state (scroll progress, hover, etc.) stays local
 * to the component/hook that owns it. */
export const useUiStore = create<UiState>((set) => ({
  soundEnabled: false,
  setSoundEnabled: (v) => set({ soundEnabled: v }),
}));
