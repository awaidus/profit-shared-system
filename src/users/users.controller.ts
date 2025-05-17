import { Body, Controller, Put, Req, UseGuards, UseInterceptors, ForbiddenException } from '@nestjs/common';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UsersService } from './users.service';
import { RbacGuard } from './guards/rbac.guard';
import { AuditInterceptor } from './interceptors/audit.interceptor';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('profile')
export class UsersController {
	constructor(private readonly userService: UsersService) {}

	@Put('update')
	@UseGuards(JwtAuthGuard, RbacGuard)
	@UseInterceptors(AuditInterceptor)
	async updateProfile(@Req() req, @Body() dto: UpdateProfileDto) {

		
		
		const userId = req.user.id;
		return this.userService.updateOwnProfile(+userId, dto);
	}
}
