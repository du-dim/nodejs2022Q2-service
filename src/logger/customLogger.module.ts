import { Module } from '@nestjs/common';
import { AllExceptionFilter } from './allExceptions';
import { LoggerMiddleware } from './loggerMiddleware';
import { WriteLog } from './writeLogtoFile';

@Module({
  providers: [WriteLog, LoggerMiddleware, AllExceptionFilter],
  exports: [WriteLog, LoggerMiddleware, AllExceptionFilter],
})
export class CustomLoggerModule {}
