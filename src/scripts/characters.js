// Obtiene elementos del html
const body = document.body;
const containers = document.querySelectorAll(".char-container");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const presentation = document.querySelector(".presentation");
const presCard = document.querySelector(".presentation__card");
const presText = document.querySelector(".presentation__text");
const presChar = document.querySelector(".presentation__character");

// ── Datos de los personajes ────────────────────────────────────────────────────
const descriptions = {
  Einar:
    "Einar es un hombre reservado y disciplinado, un guerrero que ha forjado su carácter a través del esfuerzo constante. No busca reconocimiento, sino perfeccionarse para cumplir con su propósito: proteger a su hermana.",

  Runa: "Hechicera rúnica, una arquera sin igual, contenedor de un gran poder ancestral, encargada de mantener un orden en la aldea de Midgard y cuidar de su hermano",
  Hel: "Señora del reino de los muertos, una reina con un poder que trasciende la vida y la muerte, una figura fría e implacable que gobierna sobre las almas de los caídos",
  Sombra: "Espectro que camina entre los vivos y los caídos...",
  Moder: "Madre de dragones, antigua como el hielo de los fiordos...",
  Fader: "El padre olvidado, cuyo nombre borraron los dioses...",
};

// ── Creación de los textos para la modal ───────────────────────────────────────
const buildCharHTML = (name) => {
  const description = descriptions[name] ?? "Descripción no disponible.";
  return `<h2>${name}</h2><p>${description}</p>`;
};

// Siempre muestra el texto a la izquierda y la card a la derecha
const showTextPanels = (html) => {
  presText.innerHTML = html;
  presText.classList.remove("hidden");
};

// ── Modal ──────────────────────────────────────────────────────────────────────
const openModal = () => {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  presentation.classList.remove("hidden");
  presentation.classList.add("fixed");
  body.classList.add("overflow-hidden");
  document.documentElement.style.scrollbarGutter = "auto";
};

const closeModal = () => {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
  presentation.classList.add("hidden");
  presentation.classList.remove("fixed");
  presText.classList.add("hidden");
  presCard.innerHTML = "";
  body.classList.remove("overflow-hidden");
  document.documentElement.style.scrollbarGutter = "stable";
  containers.forEach((char) => {
    char.style.visibility = "visible";
    char.classList.remove("card-transform");
    char.querySelector(".character").classList.remove("character-show");
    char.querySelector(".char-name").classList.remove("hidden");
  });
};

// ── Funcionalidad de la modal ──────────────────────────────────────────────────
containers.forEach((char) => {
  char.addEventListener("click", () => {
    const name = char.querySelector(".char-name").textContent.trim();

    showTextPanels(buildCharHTML(name));

    openModal();

    char.style.visibility = "hidden";
    char.classList.add("card-transform");
    char.querySelector(".character").classList.add("character-show");
    char.querySelector(".char-name").classList.add("hidden");

    presCard.innerHTML = char.innerHTML;
    presCard.classList.add("card-transform", "modal-card");
    presChar.classList.add("character-show");
  });
});

[modal, overlay, presentation].forEach((el) =>
  el.addEventListener("click", closeModal),
);
