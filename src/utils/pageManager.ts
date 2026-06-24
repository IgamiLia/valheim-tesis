/**
 * pageManager — ejecuta scripts específicos de cada página según
 * `<body data-page="...">`.
 *
 * Pensado para escalar: cada página futura registra su módulo con
 * `pageManager.register("nombre", { init, destroy })`. En cada navegación se
 * destruye el de la página saliente y se inicializa el de la entrante.
 *
 * Ejemplo (en un <script> de la página o de un componente):
 *   import { pageManager } from "@utils/pageManager";
 *   pageManager.register("serie", {
 *     init() {  ...listeners/observers de /serie...  },
 *     destroy() {  ...cleanup...  },
 *   });
 */
export interface PageModule {
  init?: () => void;
  destroy?: () => void;
}

const registry = new Map<string, PageModule>();
let active: PageModule | null = null;

export const pageManager = {
  register(page: string, mod: PageModule): void {
    registry.set(page, mod);
    // Si se registra cuando esa página ya es la activa (orden de carga),
    // inicialízalo de inmediato.
    if (document.body.dataset.page === page && active !== mod) {
      active = mod;
      mod.init?.();
    }
  },

  init(): void {
    const page = document.body.dataset.page ?? "";
    active = registry.get(page) ?? null;
    active?.init?.();
  },

  destroy(): void {
    active?.destroy?.();
    active = null;
  },
};
