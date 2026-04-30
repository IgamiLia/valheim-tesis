export class AudioManager {
  private audio: HTMLAudioElement | null = null;
  private currentSrc: string | null = null;
  public isPlaying: boolean = false;

  init(audioElement: HTMLAudioElement) {
    this.audio = audioElement;
  }

  async play(src: string) {
    if (!this.audio) return;

    if (this.currentSrc !== src) {
      await this.fadeOut();

      this.audio.src = src;
      this.currentSrc = src;
    }

    await this.audio.play();
    this.isPlaying = true;
  }

  pause() {
    if (!this.audio) return;

    this.audio.pause();
    this.isPlaying = false;
  }

  private fadeOut(duration: number = 500): Promise<void> {
    if (!this.audio || this.audio.volume === 0) {
      return Promise.resolve();
    }

    const step = this.audio.volume / (duration / 50);

    return new Promise((resolve) => {
      const interval = setInterval(() => {
        if (!this.audio) return;

        if (this.audio.volume > step) {
          this.audio.volume -= step;
        } else {
          this.audio.volume = 0;
          this.audio.pause();
          clearInterval(interval);
          resolve();
        }
      }, 50);
    });
  }

  async fadeIn(duration: number = 500) {
    if (!this.audio) return;

    this.audio.volume = 0;
    await this.audio.play();

    const step = 1 / (duration / 50);

    return new Promise<void>((resolve) => {
      const interval = setInterval(() => {
        if (!this.audio) return;

        if (this.audio.volume < 1 - step) {
          this.audio.volume += step;
        } else {
          this.audio.volume = 1;
          clearInterval(interval);
          resolve();
        }
      }, 50);
    });
  }
}

export const audioManager = new AudioManager();
