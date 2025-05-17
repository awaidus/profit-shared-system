import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
export class RbacGuard implements CanActivate {
	canActivate(ctx: ExecutionContext): boolean {
		const request = ctx.switchToHttp().getRequest();
		if (request.user.role !== 'user') {
			throw new ForbiddenException('Only users with role `user` can update profile.');
		}
		return true;
	}
}
