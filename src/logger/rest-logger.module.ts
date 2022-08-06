import { Module } from '@nestjs/common';
import { RestLoggerService } from './rest-logger.service';
import { WriteLog } from './writeLogtoFile';

@Module({
  providers: [RestLoggerService, WriteLog],
  exports: [RestLoggerService, WriteLog],
})
export class RestLoggerModule {}
