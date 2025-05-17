import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
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
				next: () => console.log({ ...log, status: 'SUCCESS' }),
				error: (err) => console.log({ ...log, status: 'FAILURE', reason: err.message }),
			})
		);
	}
}
