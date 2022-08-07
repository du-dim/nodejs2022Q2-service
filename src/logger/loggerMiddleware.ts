import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { logOut } from './logOut';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { method, originalUrl, query, body, user } = request;

    response.on('close', () => {
      const { statusCode } = response;
      const log = logOut(
        method,
        originalUrl,
        query,
        body,
        user,
        statusCode,
        '',
      );
      if (statusCode < 400) this.logger.log(log);
    });
    next();
  }
}
