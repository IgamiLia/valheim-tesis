/**
 * observerManager — utilidad para registrar observers (Intersection/Resize/
 * Mutation) y desconectarlos todos de una sola vez al destruir.
 *
 * Evita leaks y referencias a nodos eliminados tras una navegación SPA:
 * los componentes crean sus observers a través de una instancia y llaman
 * `destroy()` en `astro:before-swap`.
 *
 * Uso:
 *   const obs = createObserverManager();
 *   obs.add(new IntersectionObserver(cb)).observe(el);
 *   // ...
 *   obs.destroy();
 */
type AnyObserver = IntersectionObserver | ResizeObserver | MutationObserver;

export function createObserverManager() {
  const observers = new Set<AnyObserver>();

  return {
    /** Registra un observer y lo devuelve para encadenar `.observe()`. */
    add<T extends AnyObserver>(observer: T): T {
      observers.add(observer);
      return observer;
    },
    /** Desconecta y olvida todos los observers registrados. */
    destroy(): void {
      observers.forEach((o) => o.disconnect());
      observers.clear();
    },
  };
}

export type ObserverManager = ReturnType<typeof createObserverManager>;
