import { Injectable } from '@angular/core';

@Injectable()
export class LoggerService {
  log(message: string): void {
    const timeString: string = new Date().toLocaleTimeString();
    console.log(`${message} (${timeString})`)
  }

  error(message: string): void {
    console.log(`ERROR: ${message}`)
  }
}

