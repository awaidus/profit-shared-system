import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
export class RbacGuard implements CanActivate {
	canActivate(ctx: ExecutionContext): boolean {
		const req = ctx.switchToHttp().getRequest();

		if (req.user?.role !== 'user') {
			throw new ForbiddenException('Only role "user" is allowed');
		}
		return true;
	}
}
