import { REPEAT_DELAY_MS, REPEAT_INTERVAL_MS } from '../const';

/**
 * Fire once immediately, then repeatedly while still held. The first repeat is
 * delayed, subsequent repeats are spaced by the repeat interval.
 */
export class HoldRepeater {
  private timeout?: number;
  private interval?: number;

  constructor(private readonly onFire: () => void) {}

  start(): void {
    this.stop();
    this.onFire();
    this.timeout = window.setTimeout(() => {
      this.interval = window.setInterval(() => this.onFire(), REPEAT_INTERVAL_MS);
    }, REPEAT_DELAY_MS);
  }

  stop(): void {
    if (this.timeout !== undefined) {
      clearTimeout(this.timeout);
      this.timeout = undefined;
    }
    if (this.interval !== undefined) {
      clearInterval(this.interval);
      this.interval = undefined;
    }
  }
}
