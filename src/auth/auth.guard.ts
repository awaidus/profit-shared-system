import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class JwtAuthGuard implements CanActivate {
	canActivate(ctx: ExecutionContext): boolean {
		const request = ctx.switchToHttp().getRequest();
		// for testing
		request.user = {
			id: 1,
			role: 'user',
			ip: request.ip,
		};
		return true;
	}
}
