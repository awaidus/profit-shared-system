import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class UsersService {
	constructor(private db: DatabaseService) {}

	async updateOwnProfile(userId: number, dto: UpdateProfileDto) {
		
		const user = await this.db.user.findUnique({
			where: { id: userId },
		});

		if (!user) throw new NotFoundException('User not found');

		return this.db.user.update({
			where: { id: userId },
			data: dto,
		});
	}
}
