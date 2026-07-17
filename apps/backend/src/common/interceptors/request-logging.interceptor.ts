import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Request } from 'express';
import { CORRELATION_ID_HEADER } from '../middleware/correlation-id.middleware';

@Injectable()
export class RequestLoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<Request>();
    const { method, url } = request;
    const correlationId = request.headers[CORRELATION_ID_HEADER] as string;
    const start = Date.now();

    return next.handle().pipe(
      tap({
        next: () => {
          const response = context.switchToHttp().getResponse();
          response.setHeader(CORRELATION_ID_HEADER, correlationId);
          const duration = Date.now() - start;
          this.logger.log(`${method} ${url} ${response.statusCode} ${duration}ms [${correlationId}]`);
        },
        error: (err) => {
          const duration = Date.now() - start;
          this.logger.error(`${method} ${url} ${err.status ?? 500} ${duration}ms [${correlationId}]`);
        },
      }),
    );
  }
}
