import { Module } from '@nestjs/common';
import { ArticlesModule } from './articles/module/articles.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { ApiModule } from './api/module/api.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URL'),
      }),
      inject: [ConfigService],
    }),
    ScheduleModule.forRoot(),
    ArticlesModule,
    ApiModule,
  ],
})
export class AppModule {}
