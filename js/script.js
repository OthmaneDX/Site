/* Kilow Limited — progressive enhancement only.
   The page is fully usable with this file blocked: smooth scrolling, the
   sticky-header effect and section reveals are all handled in CSS, and the
   mobile menu runs on the native popover API. */

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

  /* Scrollspy: mark the nav link for whichever section is in view.
     Skipped entirely on pages without in-page anchors. */
  const links = [...document.querySelectorAll('.nav-desktop a[href^="#"]')];
  if (!links.length || !("IntersectionObserver" in window)) return;

  const byId = new Map(
    links.map((a) => [a.getAttribute("href").slice(1), a])
  );
  const sections = [...byId.keys()]
    .map((id) => document.getElementById(id))
    .filter(Boolean);

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
