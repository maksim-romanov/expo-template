export interface Logger {
  log(message: string): void;
}

export class BaseLogger implements Logger {
  constructor(public readonly name: string) {}

  log(message: string) {
    console.log(`[${this.name}] ${message}`);
  }
}
