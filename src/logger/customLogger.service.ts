import { Injectable, LoggerService } from '@nestjs/common';
import { WriteLog } from './writeLogtoFile';

const level = process.env.LOGGER_LEVEL;

@Injectable()
export class CustomLogger implements LoggerService {
  level = process.env.LOGGER_LEVEL;
  private write = new WriteLog();

  log(message: string) {
    if (+level < 1) return;
    this.write.writeTotal(message);
  }
  error(message: string) {
    if (+level < 2) return;
    this.write.writeError(message);
    this.write.writeTotal(message);
  }
  warn(message: string) {
    if (+level < 3) return;
    this.write.writeTotal(message);
  }
  debug(message: string) {
    if (+level < 4) return;
    this.write.writeTotal(message);
  }
  verbose(message: string) {
    if (+level < 5) return;
    this.write.writeTotal(message);
  }
}
