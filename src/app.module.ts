import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
	imports: [
		ThrottlerModule.forRoot([
			{
				ttl: 60000, // milliseconds (1 minute)
				limit: 3, // 3 request per ip per minute
			},
		]),
		UsersModule,
		AuthModule,
		DatabaseModule,
	],
	controllers: [AppController],
	providers: [
		{
			provide: APP_GUARD,
			useClass: ThrottlerGuard, // Apply rate limiting globally
		},
		AppService,
	],
})
export class AppModule {}
