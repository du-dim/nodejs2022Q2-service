import { Module } from '@nestjs/common';
import { LoggerMiddleware } from './loggerMiddleware';
import { CustomLogger } from './rest-logger.service';
import { WriteLog } from './writeLogtoFile';

@Module({
  providers: [CustomLogger, WriteLog, LoggerMiddleware],
  exports: [CustomLogger, WriteLog, LoggerMiddleware],
})
export class RestLoggerModule {}
