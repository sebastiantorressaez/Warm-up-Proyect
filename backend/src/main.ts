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

  const port = configService.get('PORT');

  app.enableCors({
    origin: (origin, callback) => {
      const allowedOrigins = [/^http:\/\/localhost(:\d{1,5})?$/];
      if (!origin || allowedOrigins.some((o) => o.test(origin))) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'), false);
      }
    },
    methods: ['GET', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  });

  await app.listen(port);
}
bootstrap();
