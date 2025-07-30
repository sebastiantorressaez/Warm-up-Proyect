import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { WuproyectConfig } from './config/wu-proyect.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const wuproyectConfig = app.get(WuproyectConfig);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

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

  await app.listen(wuproyectConfig.envConfig.port || 3000);
}
bootstrap();
