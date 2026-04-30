import { audioManager } from "./audioManager";

type SectionElement = HTMLElement & {
  dataset: {
    audio?: string;
  };
};

export class SectionAudioObserver {
  private observer: IntersectionObserver;
  private currentSection: SectionElement | null = null;

  constructor() {
    this.observer = new IntersectionObserver(this.handleIntersect.bind(this), {
      threshold: 0.6,
    });
  }

  observeAll() {
    const sections = document.querySelectorAll<SectionElement>("[data-audio]");

    sections.forEach((section) => this.observer.observe(section));
  }

  private async handleIntersect(entries: IntersectionObserverEntry[]) {
    for (const entry of entries) {
      const section = entry.target as SectionElement;

      if (!entry.isIntersecting) continue;

      // Evitar retrigger innecesario
      if (this.currentSection === section) return;

      this.currentSection = section;

      const src = section.dataset.audio;

      if (!src) return;

      await audioManager.play(src);
    }
  }

  disconnect() {
    this.observer.disconnect();
  }
}
