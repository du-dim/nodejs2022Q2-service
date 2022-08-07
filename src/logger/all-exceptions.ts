import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { IHttpExceptionRes } from 'src/_typesTS/types';
import { WriteLog } from './writeLogtoFile';
import { logOut } from './logOut';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private writeLog: WriteLog) {}
  private logger = new Logger('HTTP');
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status: HttpStatus;
    let errorMessage: string;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const errorResponse = exception.getResponse();
      errorMessage =
        (errorResponse as IHttpExceptionRes).error || exception.message;
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      errorMessage = 'Critical internal server error occurred!';
    }

    const errorResponse = this.getErrorResponse(status, errorMessage);
    const errorLog = this.getLogError(errorResponse, request);

    // this.writeLog.writeError(errorLog);
    // this.writeLog.writeTotal(errorLog);
    this.logger.error(errorLog);

    response.status(status).json(errorResponse);
  }
  getErrorResponse = (status: HttpStatus, errorMessage: string) => ({
    statusCode: status,
    error: errorMessage,
  });
  getLogError = (errorResponse: IHttpExceptionRes, request: Request) => {
    const { statusCode, error } = errorResponse;
    const { method, originalUrl, query, body, user } = request;
    return logOut(method, originalUrl, query, body, user, statusCode, error);
  };
}
