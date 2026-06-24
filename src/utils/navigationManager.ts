/**
 * navigationManager — orquesta el ciclo de vida de los scripts con las
 * transiciones de Astro (`<ClientRouter />`).
 *
 * - `astro:page-load`  → init de todos los managers (corre en la carga inicial
 *   y después de CADA navegación SPA). Aquí se re-vinculan listeners al DOM
 *   nuevo, se re-inicializan observers, se actualiza la música, etc.
 * - `astro:before-swap` → destroy de todos los managers ANTES de reemplazar el
 *   DOM viejo. Libera listeners/observers y evita leaks y referencias a nodos
 *   eliminados. (El estado persistente —p. ej. la instancia de Audio— vive en
 *   sus módulos y no se destruye.)
 *
 * Se importa una sola vez desde el Layout.
 */
import { audioManager } from "./audioManager";
import { headerManager } from "./headerManager";
import { pageManager } from "./pageManager";

interface Manager {
  init: () => void;
  destroy: () => void;
}

const managers: Manager[] = [audioManager, headerManager, pageManager];

let wired = false;

export function setupNavigation(): void {
  if (wired) return;
  wired = true;

  // Corre en la carga inicial y tras cada navegación.
  document.addEventListener("astro:page-load", () => {
    for (const m of managers) m.init();
  });

  // Limpieza antes de destruir el DOM saliente.
  document.addEventListener("astro:before-swap", () => {
    for (const m of managers) m.destroy();
  });
}
