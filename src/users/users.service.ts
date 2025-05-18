import { Injectable, ForbiddenException, NotFoundException, BadRequestException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

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

	async create(dto: CreateUserDto) {

		const uerExists = await this.findByEmail(dto.email);
		if (uerExists) {
			throw new BadRequestException('User already exist');
		}

		const hashedPassword = await bcrypt.hash(dto.password, 10);
		return this.db.user.create({
			data: {
				...dto,
				password: hashedPassword,
			},
		});
	}

	async findByEmail(email: string) {
		return this.db.user.findUnique({ where: { email } });
	}

	async verifyPassword(userId: number, rawPassword: string) {
		const user = await this.db.user.findUnique({ where: { id: userId } });
		if (!user) return false;

		return bcrypt.compare(rawPassword, user.password);
	}
}
