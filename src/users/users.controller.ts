import { Body, Controller, Put, Req, UseGuards, UseInterceptors, ForbiddenException, Post } from '@nestjs/common';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UsersService } from './users.service';
import { RbacGuard } from './guards/rbac.guard';
import { AuditInterceptor } from './interceptors/audit.interceptor';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('profile')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Put('update')
	@UseGuards(JwtAuthGuard, RbacGuard)
	@UseInterceptors(AuditInterceptor)
	async updateProfile(@Req() req, @Body() dto: UpdateProfileDto) {
		const userId = req.user.id;
		return this.usersService.updateOwnProfile(+userId, dto);
	}

	@Post('create')
	async register(@Body() dto: CreateUserDto) {
		const user = await this.usersService.create(dto);

		return {
			id: user.id,
			name: user.name,
			email: user.email,
			role: user.role,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
		};
	}
}
