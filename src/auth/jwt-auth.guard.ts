import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class JwtAuthGuard implements CanActivate {
	canActivate(ctx: ExecutionContext): boolean {
		const req = ctx.switchToHttp().getRequest();
		
		// TODO: For testing
		req.user = {
			id: 1,
			role: 'admin',
		};

		return true;
	}
}
