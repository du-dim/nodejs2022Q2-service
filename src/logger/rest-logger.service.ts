/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable, LoggerService, LogLevel } from '@nestjs/common';
import { WriteLog } from './writeLogtoFile';

@Injectable()
export class CustomLogger implements LoggerService {
  // private level = process.env.LOGGER_LEVEL;
  // private levels: LogLevel[] = ['log', 'error', 'warn', 'debug', 'verbose'];
  constructor(private writeLog: WriteLog) {}

  log(message: string, ...optionalParams: any[]) {
    this.writeLog.writeTotal(message);
  }
  error(message: string, ...optionalParams: any[]) {
    this.writeLog.writeError(message);
    this.writeLog.writeTotal(message);
  }
  warn(message: string, ...optionalParams: any[]) {
    this.writeLog.writeTotal(message);
  }
  debug?(message: string, ...optionalParams: any[]) {
    this.writeLog.writeTotal(message);
  }
  verbose?(message: string, ...optionalParams: any[]) {
    this.writeLog.writeTotal(message);
  }
  setLogLevels?(levels: LogLevel[]) {}
}
