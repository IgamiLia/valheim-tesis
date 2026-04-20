const audioContainer = document.getElementById("soundtrack");
const audio = audioContainer.querySelector("audio");
const musicBtn = document.getElementById("music-toggle");

// Estado inicial: música sonando (autoplay)
let isPlaying = true;

// Función para alternar play/pause
function toggleMusic() {
  if (isPlaying) {
    audio.pause();
    musicBtn.classList.add("paused");
  } else {
    audio.play();
    musicBtn.classList.remove("paused");
  }
  isPlaying = !isPlaying;
}

// Evento del botón
musicBtn.addEventListener("click", toggleMusic);

// Manejar si el autoplay falla (navegadores que lo bloquean)
audio.addEventListener("play", () => {
  isPlaying = true;
  musicBtn.classList.remove("paused");
});

audio.addEventListener("pause", () => {
  isPlaying = false;
  musicBtn.classList.add("paused");
});

// Intentar reproducir al cargar
audio.play().catch(() => {
  // Si el navegador bloquea el autoplay, mostrar estado pausado
  isPlaying = false;
  musicBtn.classList.add("paused");
});
