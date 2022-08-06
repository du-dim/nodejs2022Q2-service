import { Injectable, LoggerService, Logger, LogLevel } from '@nestjs/common';

@Injectable()
export class RestLoggerService {
  private readonly logger = new Logger('REST');
  log(message: string, trace: string) {
    return this.logger.log(message);
  }
  error(message: string, stack: unknown) {
    return this.logger.error(message, stack);
  }
  warn(message: string, trace: string) {
    return this.logger.warn(message);
  }
  debug?(message: string, trace: string) {
    return this.logger.debug(message);
  }
  verbose?(message: string, trace: string) {
    return this.logger.verbose(message);
  }
  setLogLevels?(levels: LogLevel[]) {
    levels.forEach((level) => this.logger[level]);
  }
}
