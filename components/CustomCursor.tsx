"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useCanRunFullExperience } from "@/hooks/useIsTouchDevice";

export type CursorState = "default" | "link" | "game" | "drag" | "play";

const RING_SIZE: Record<CursorState, number> = {
  default: 26,
  link: 40,
  game: 56,
  drag: 64,
  play: 72,
};

/** Fixed dot+ring cursor with a handful of states, driven entirely by
 * `data-cursor="link|game|drag|play"` attributes elsewhere in the DOM (event
 * delegation via pointerover, same approach proven on the previous site).
 * Position is written straight to the DOM in the pointermove handler rather
 * than through React state, so it never re-renders on every mouse move. */
export function CustomCursor() {
  const reducedMotion = useReducedMotion();
  const { canHover } = useCanRunFullExperience();
  const rootRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<CursorState>("default");
  const [label, setLabel] = useState("");
  const [hasMoved, setHasMoved] = useState(false);
  const active = canHover && !reducedMotion;

  useEffect(() => {
    if (!active) return;

    document.body.classList.add("has-cursor-fx");

    const onMove = (e: PointerEvent) => {
      const el = rootRef.current;
      // Centering (-50%/-50%) is baked into this same `translate` value
      // rather than applied via a separate Tailwind translate utility class,
      // since both would target the same CSS property and the inline style
      // set here would silently win, dropping the centering offset.
      if (el) el.style.translate = `calc(${e.clientX}px - 50%) calc(${e.clientY}px - 50%)`;
      setHasMoved(true);
    };

    const onOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      const trigger = target.closest<HTMLElement>("[data-cursor]");
      if (trigger) {
        const kind = (trigger.dataset.cursor as CursorState) || "link";
        setState(kind);
        setLabel(trigger.dataset.cursorLabel ?? "");
      } else if (target.closest("a, button, [role='button']")) {
        setState("link");
        setLabel("");
      } else {
        setState("default");
        setLabel("");
      }
    };

    document.addEventListener("pointermove", onMove);
    document.addEventListener("pointerover", onOver);
    return () => {
      document.body.classList.remove("has-cursor-fx");
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
    };
  }, [active]);

  if (!active) return null;

  const size = RING_SIZE[state];

  return (
    <div
      ref={rootRef}
      aria-hidden
      className={`pointer-events-none fixed top-0 left-0 z-[200] transition-[translate,opacity] duration-75 ease-linear ${hasMoved ? "opacity-100" : "opacity-0"}`}
    >
      <div
        className="grid place-items-center rounded-full border border-paper/50 bg-ink-950/20 backdrop-blur-[1px] transition-[width,height,background-color,border-color] duration-300 ease-out"
        style={{ width: size, height: size }}
      >
        {label ? (
          <span className="font-display text-[11px] font-bold tracking-[0.12em] text-paper uppercase">
            {label}
          </span>
        ) : (
          <span
            className="rounded-full bg-accent-lite transition-transform duration-300"
            style={{
              width: state === "default" ? 6 : 0,
              height: state === "default" ? 6 : 0,
            }}
          />
        )}
      </div>
    </div>
  );
}
