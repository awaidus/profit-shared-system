import { IsString, Length, MaxLength } from 'class-validator';

export class UpdateProfileDto {
	@IsString()
	@Length(1, 60)
	name: string;

	@IsString()
	@MaxLength(250)
	bio: string;
}
