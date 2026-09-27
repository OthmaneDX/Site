"use client";

import { useEffect } from "react";
import { useUiStore } from "@/store/ui";
import { getSoundPreference, setSoundPreference, playTone } from "@/lib/sound";

/** Sound is off by default and never autoplays — this toggle is the only
 * way it turns on, and the choice persists locally. */
export function SoundToggle({ className = "" }: { className?: string }) {
  const soundEnabled = useUiStore((s) => s.soundEnabled);
  const setSoundEnabled = useUiStore((s) => s.setSoundEnabled);

  useEffect(() => {
    setSoundEnabled(getSoundPreference());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function toggle() {
    const next = !soundEnabled;
    setSoundEnabled(next);
    setSoundPreference(next);
    if (next) playTone("click");
  }

  return (
    <button
      type="button"
      onClick={toggle}
      data-cursor="link"
      aria-pressed={soundEnabled}
      className={`font-display text-xs font-bold tracking-[0.14em] text-paper-dim uppercase transition-colors hover:text-paper ${className}`}
    >
      {soundEnabled ? "Sound On" : "Sound Off"}
    </button>
  );
}
