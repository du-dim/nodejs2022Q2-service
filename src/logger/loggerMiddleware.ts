import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CustomLogger } from './customLogger.service';
import { logOut } from './logOut';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new CustomLogger();
  startTime = 0;
  use(request: Request, response: Response, next: NextFunction): void {
    const { method, originalUrl, query, body, user } = request;
    request.on('end', () => {
      this.startTime = Date.now();
    });

    response.on('close', () => {
      const { statusCode } = response;
      const time = Date.now() - this.startTime;
      const log = logOut(
        'LOG',
        method,
        originalUrl,
        query,
        body,
        user,
        statusCode,
        '',
        time,
      );
      if (statusCode < 400) this.logger.log(log);
    });
    next();
  }
}
