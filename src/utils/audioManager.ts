/**
 * audioManager — música de fondo global.
 *
 * - Mantiene UNA sola instancia de `Audio` (vive en el módulo, que se carga
 *   una vez y sobrevive a las navegaciones SPA del ClientRouter).
 * - La canción de cada página se declara en `<body data-music="/ruta.mp3">`.
 * - Conserva el estado play/pause entre navegaciones.
 * - Al cambiar de página hace crossfade a la nueva pista.
 * - No crea múltiples objetos `Audio` ni acumula listeners (el botón se
 *   re-vincula en cada `init()` y se libera en `destroy()`).
 */

let audio: HTMLAudioElement | null = null;
let currentSrc = "";
let playing = false;
let fadeRaf = 0;

let btn: HTMLButtonElement | null = null;
let onClick: (() => void) | null = null;

function getAudio(): HTMLAudioElement {
  if (!audio) {
    audio = new Audio();
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0;
  }
  return audio;
}

function fade(to: number, duration = 500): Promise<void> {
  const a = getAudio();
  cancelAnimationFrame(fadeRaf);
  const from = a.volume;
  const start = performance.now();
  return new Promise((resolve) => {
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      a.volume = Math.max(0, Math.min(1, from + (to - from) * t));
      if (t < 1) fadeRaf = requestAnimationFrame(tick);
      else resolve();
    };
    fadeRaf = requestAnimationFrame(tick);
  });
}

function syncButton(): void {
  if (!btn) return;
  btn.classList.toggle("paused", !playing);
  btn.setAttribute("aria-pressed", String(playing));
}

async function play(): Promise<void> {
  const a = getAudio();
  try {
    await a.play();
    playing = true;
    syncButton();
    await fade(1);
  } catch {
    // El navegador bloquea el autoplay hasta que haya interacción del usuario.
    playing = false;
    syncButton();
  }
}

async function pause(): Promise<void> {
  await fade(0);
  getAudio().pause();
  playing = false;
  syncButton();
}

function toggle(): void {
  if (playing) pause();
  else play();
}

/** Cambia de pista con crossfade, preservando el estado play/pause. */
async function setTrack(src: string): Promise<void> {
  if (!src || src === currentSrc) return;
  const a = getAudio();
  const wasPlaying = playing;
  currentSrc = src;
  if (wasPlaying) await fade(0);
  a.src = src;
  a.load();
  a.volume = 0;
  if (wasPlaying) await play();
  else syncButton();
}

export const audioManager = {
  init(): void {
    const src = document.body.dataset.music ?? "";

    btn = document.getElementById("music-btn") as HTMLButtonElement | null;
    if (btn) {
      onClick = () => toggle();
      btn.addEventListener("click", onClick);
    }

    if (!src) {
      syncButton();
      return;
    }

    if (!currentSrc) {
      // Primera carga: intenta autoplay (queda en pausa si el navegador lo bloquea).
      const a = getAudio();
      currentSrc = src;
      a.src = src;
      a.load();
      a.volume = 0;
      play();
    } else {
      setTrack(src);
    }

    syncButton();
  },

  destroy(): void {
    if (btn && onClick) btn.removeEventListener("click", onClick);
    btn = null;
    onClick = null;
    // La instancia de Audio y el estado play/pause persisten entre navegaciones.
  },
};
