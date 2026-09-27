/** Cheap 2D stand-in for the 3D scene — not a scaled-down version of it, a
 * genuinely different, lightweight visual: layered radial gradients plus a
 * handful of small glowing dots, the same trick proven on the previous
 * site's hero. No canvas, no WebGL, near-zero cost. */
export function HeroFallback() {
  const dots = [
    { top: "18%", left: "72%", size: 10 },
    { top: "68%", left: "12%", size: 7 },
    { top: "32%", left: "20%", size: 5 },
    { top: "78%", left: "80%", size: 8 },
  ];

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 70% 30%, oklch(0.4 0.19 288 / 0.35), transparent 70%), radial-gradient(50% 40% at 20% 70%, oklch(0.3 0.14 288 / 0.25), transparent 70%)",
        }}
      />
      {dots.map((d, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-accent-lite/70 blur-[1px] motion-safe:animate-pulse"
          style={{ top: d.top, left: d.left, width: d.size, height: d.size }}
        />
      ))}
    </div>
  );
}
