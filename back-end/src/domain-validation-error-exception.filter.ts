import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import DomainValidationError from './Domain/Errors/DomainValidationError';

@Catch(DomainValidationError)
export class DomainValidationErrorExceptionFilter implements ExceptionFilter {
  catch(exception: DomainValidationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    response.status(400).json({
      statusCode: 400,
      message: 'Validation error',
      error: 'Bad Request',
      validator: exception,
    });
  }
}
