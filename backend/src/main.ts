import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const front_url = configService.get('FRONT_URL');
  const port = configService.get('PORT');

  app.enableCors({
    origin: [front_url],
    methods: ['GET', 'POST', 'DELETE'],
    allowedHeaders: [
      'Content-Type',
    ],
  });

  await app.listen(port);
}
bootstrap();
