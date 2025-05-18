// src/users/dto/create-user.dto.ts
import { IsEmail, IsNotEmpty, IsOptional, IsString, Length, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
	@IsNotEmpty()
	@Length(1, 60)
	name: string;

	@IsEmail()
	email: string;

	@IsString()
	@MaxLength(250)
	@IsOptional()
	bio: string;

	@MinLength(6)
	password: string;
}
