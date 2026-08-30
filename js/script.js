/* Kilow Limited — progressive enhancement only.
   The page is fully usable with this file blocked: smooth scrolling, section
   reveals, hero/nav layout and the mobile menu all work in pure CSS/HTML.
   Everything below only adds pointer-driven polish on desktops that can take
   it, and never blocks or delays the page from being usable. */

(() => {
  "use strict";

  /* Keep the footer year honest without a rebuild. */
  const year = String(new Date().getFullYear());
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = year;
  });

  /* Close the popover menu after tapping a link, so returning to the page
     (or jumping to an anchor) doesn't leave the sheet open. */
  const menu = document.getElementById("mobile-nav");
  if (menu && typeof menu.hidePopover === "function") {
    menu.addEventListener("click", (e) => {
      if (e.target.closest("a") && menu.matches(":popover-open")) {
        menu.hidePopover();
      }
    });
  }

  /* ------------------------------------------------------------------------
     Scrollspy: mark the nav link for whichever section is in view.
     ------------------------------------------------------------------------ */
  (() => {
    const links = [...document.querySelectorAll('.nav-desktop a[href^="#"]')];
    if (!links.length || !("IntersectionObserver" in window)) return;

    const byId = new Map(links.map((a) => [a.getAttribute("href").slice(1), a]));
    const sections = [...byId.keys()].map((id) => document.getElementById(id)).filter(Boolean);

    const spy = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          for (const a of links) a.removeAttribute("aria-current");
          byId.get(entry.target.id)?.setAttribute("aria-current", "true");
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach((section) => spy.observe(section));
  })();

  /* ------------------------------------------------------------------------
     Count-up stats: run once when a stat scrolls into view.
     ------------------------------------------------------------------------ */
  (() => {
    const stats = [...document.querySelectorAll("[data-count-to]")];
    if (!stats.length || !("IntersectionObserver" in window)) return;

    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const animateCount = (el) => {
      const to = parseInt(el.dataset.countTo, 10);
      const suffix = el.dataset.countSuffix || "";
      if (reduceMotion || !Number.isFinite(to)) {
        el.textContent = to + suffix;
        return;
      }
      const duration = 1100;
      const start = performance.now();
      const step = (now) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(to * eased) + suffix;
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          animateCount(entry.target);
          obs.unobserve(entry.target);
        }
      },
      { threshold: 0.6 }
    );

    stats.forEach((el) => io.observe(el));
  })();

  /* ------------------------------------------------------------------------
     Pointer-driven polish: custom cursor, magnetic elements, tilt cards,
     hero parallax. Skipped entirely on touch devices and when the visitor
     has asked for reduced motion — each is genuinely a separate axis:
     a fine-pointer laptop can still prefer reduced motion.
     ------------------------------------------------------------------------ */
  const canHover = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const wantsMotion = matchMedia("(prefers-reduced-motion: no-preference)").matches;

  if (canHover && wantsMotion) initPointerFX();

  function initPointerFX() {
    document.body.classList.add("has-pointer-fx");

    /* ---- Custom cursor -------------------------------------------------- */
    const cursor = document.createElement("div");
    cursor.className = "cursor";
    cursor.setAttribute("aria-hidden", "true");
    cursor.innerHTML = '<span class="cursor-ring"></span><span class="cursor-dot"></span><span class="cursor-label"></span>';
    document.body.appendChild(cursor);
    const label = cursor.querySelector(".cursor-label");

    let raf = 0;
    document.addEventListener("pointermove", (e) => {
      document.documentElement.style.setProperty("--pointer-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--pointer-y", `${e.clientY}px`);
      if (raf) return;
      raf = requestAnimationFrame(() => {
        cursor.style.translate = `${e.clientX}px ${e.clientY}px`;
        raf = 0;
      });
    });

    document.addEventListener("pointerdown", () => cursor.classList.add("is-pressed"));
    document.addEventListener("pointerup", () => cursor.classList.remove("is-pressed"));

    document.addEventListener("pointerover", (e) => {
      const target = e.target.closest("[data-cursor]");
      if (target) {
        cursor.classList.add("is-active");
        label.textContent = target.dataset.cursor;
      } else if (e.target.closest("a, button, [role=button]")) {
        cursor.classList.add("is-active");
        label.textContent = "";
      } else {
        cursor.classList.remove("is-active");
        label.textContent = "";
      }
    });

    /* ---- Magnetic buttons & nav links ------------------------------------ */
    document.querySelectorAll("[data-magnetic]").forEach((el) => {
      const strength = parseFloat(el.dataset.magnetic) || 0.35;
      const max = 12;

      el.addEventListener("pointermove", (e) => {
        const rect = el.getBoundingClientRect();
        const dx = (e.clientX - (rect.left + rect.width / 2)) * strength;
        const dy = (e.clientY - (rect.top + rect.height / 2)) * strength;
        el.style.translate = `${Math.max(-max, Math.min(max, dx))}px ${Math.max(-max, Math.min(max, dy))}px`;
      });

      el.addEventListener("pointerleave", () => {
        el.style.translate = "";
      });
    });

    /* ---- Tilt / depth game cards ------------------------------------------ */
    document.querySelectorAll(".game-card").forEach((card) => {
      card.addEventListener("pointermove", (e) => {
        const rect = card.getBoundingClientRect();
        const px = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const py = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        card.style.setProperty("--px", px.toFixed(3));
        card.style.setProperty("--py", py.toFixed(3));
      });

      card.addEventListener("pointerleave", () => {
        card.style.setProperty("--px", 0);
        card.style.setProperty("--py", 0);
      });
    });

    /* ---- Hero parallax ---------------------------------------------------- */
    const heroArt = document.querySelector(".hero-art");
    const heroSection = document.querySelector(".hero-section");
    if (heroArt && heroSection) {
      const layers = [...heroArt.querySelectorAll("[data-depth]")];
      heroSection.addEventListener("pointermove", (e) => {
        const rect = heroSection.getBoundingClientRect();
        const px = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const py = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        for (const layer of layers) {
          const depth = parseFloat(layer.dataset.depth) || 0;
          layer.style.translate = `${px * depth * 100}px ${py * depth * 100}px`;
        }
      });
      heroSection.addEventListener("pointerleave", () => {
        for (const layer of layers) layer.style.translate = "0 0";
      });
    }
  }
})();
