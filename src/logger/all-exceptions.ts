import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request } from 'express';
import { Response } from 'express';
import * as fs from 'fs';
import { ICustomHttpExceptionRes, IHttpExceptionRes } from 'src/_typesTS/types';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
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

    const errorResponse = this.getErrorResponse(status, errorMessage, request);
    const errorLog = this.getLogError(errorResponse, request, exception);
    this.writeErrorLogToFile(errorLog);
    response.status(status).json(errorResponse);
  }
  getErrorResponse = (
    status: HttpStatus,
    errorMessage: string,
    request: Request,
  ) => ({
    statusCode: status,
    error: errorMessage,
    path: request.url,
    method: request.method,
    timeStamp: new Date(),
  });

  getLogError = (
    errorResponse: ICustomHttpExceptionRes,
    request: Request,
    exception: unknown,
  ) => {
    const { statusCode, error } = errorResponse;
    const { method, url } = request;
    const errorLog = `Response Code: ${statusCode}; Method: ${method}; URL: ${url}\n
    User: ${JSON.stringify(request.user ?? 'Not signed in')}\n
    ${exception instanceof HttpException ? exception.stack : error}\n`;
    return errorLog;
  };

  writeErrorLogToFile = (errorLog: string) => {
    fs.appendFile('error.log', errorLog, 'utf8', (err) => {
      if (err) throw err;
    });
  };
}
