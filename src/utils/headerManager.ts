/**
 * headerManager — comportamiento del header: estado "scrolled", auto-hide
 * (se esconde al bajar, reaparece al subir) y menú hamburguesa.
 *
 * `init()` se llama en cada `astro:page-load` (re-consulta el DOM nuevo y
 * re-vincula los listeners). `destroy()` se llama en `astro:before-swap` y
 * libera TODOS los listeners (sin leaks ni referencias a nodos eliminados).
 */

const SHOW_NEAR_TOP = 80; // px: siempre visible cerca del top
const DELTA = 6; // ignora micro-movimientos

let cleanup: Array<() => void> = [];
let lastY = 0;
let ticking = false;

export const headerManager = {
  init(): void {
    const header = document.getElementById("siteHeader");
    const toggle = document.getElementById("navToggle");
    const nav = document.getElementById("primaryNav");
    if (!header || !toggle || !nav) return;

    const close = () => {
      header.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
    };

    const onToggle = () => {
      const open = header.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", String(open));
    };

    const onNavClick = (e: Event) => {
      if ((e.target as HTMLElement).closest("a")) close();
    };

    lastY = window.scrollY;
    ticking = false;
    const update = () => {
      ticking = false;
      const y = window.scrollY;
      header.classList.toggle("is-scrolled", y > 40);
      if (!header.classList.contains("nav-open")) {
        if (y < SHOW_NEAR_TOP) {
          header.classList.remove("is-hidden");
        } else if (Math.abs(y - lastY) > DELTA) {
          header.classList.toggle("is-hidden", y > lastY);
        }
      }
      lastY = y;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    toggle.addEventListener("click", onToggle);
    nav.addEventListener("click", onNavClick);
    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    cleanup = [
      () => toggle.removeEventListener("click", onToggle),
      () => nav.removeEventListener("click", onNavClick),
      () => window.removeEventListener("scroll", onScroll),
    ];
  },

  destroy(): void {
    cleanup.forEach((off) => off());
    cleanup = [];
  },
};
