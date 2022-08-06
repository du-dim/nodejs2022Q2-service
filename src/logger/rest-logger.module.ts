import { Module } from '@nestjs/common';
import { RestLoggerService } from './rest-logger.service';

@Module({
  providers: [RestLoggerService],
  exports: [RestLoggerService],
})
export class RestLoggerModule {}
