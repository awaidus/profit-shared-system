import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true, // remove unknown fields
			forbidNonWhitelisted: true, //  error for unknown fields
			transform: true,
		})
	);

  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
