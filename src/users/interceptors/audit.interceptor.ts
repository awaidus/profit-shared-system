import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Logger } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
	private readonly logger = new Logger(AuditInterceptor.name); 

	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const req = context.switchToHttp().getRequest();

		const log = {
			userId: req.user?.id,
			ip: req.ip,
			time: new Date().toISOString(),
			path: req.url,
			method: req.method,
		};

		return next.handle().pipe(
			tap({
				next: () => this.logger.log({ ...log, status: 'SUCCESS' }), // Use Logger
				error: (err) => this.logger.error({ ...log, status: 'FAILURE', reason: err.message }), // Use Logger
			})
		);
	}
}
