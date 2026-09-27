"use client";

import { useEffect, useState } from "react";

/** Fine pointer + hover capability + a coarse "won't melt" heuristic. Used
 * to gate the cursor system, pointer-driven tilt, and the 3D hero scene. */
export function useCanRunFullExperience(): { canHover: boolean; isCapableDevice: boolean } {
  const [canHover, setCanHover] = useState(false);
  const [isCapableDevice, setIsCapableDevice] = useState(false);

  useEffect(() => {
    const hoverMq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setCanHover(hoverMq.matches);

    const cores = navigator.hardwareConcurrency ?? 4;
    const wide = window.innerWidth >= 768;
    setIsCapableDevice(cores >= 4 && wide);

    const onChange = (e: MediaQueryListEvent) => setCanHover(e.matches);
    hoverMq.addEventListener("change", onChange);
    return () => hoverMq.removeEventListener("change", onChange);
  }, []);

  return { canHover, isCapableDevice };
}
