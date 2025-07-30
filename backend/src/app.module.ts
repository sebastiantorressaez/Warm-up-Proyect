import { Module } from '@nestjs/common';
import { ArticlesModule } from './articles/module/articles.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { ApiModule } from './api/module/api.module';
import { ConfigModule } from '@nestjs/config';
import { WuproyectModule } from './config/wu-proyect.module';
import { WuproyectConfig } from './config/wu-proyect.config';
import { WuproyectValidateConfig } from './config/wu-proyect.validate.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: WuproyectValidateConfig,
      isGlobal: true,
    }),
    WuproyectModule,
    MongooseModule.forRootAsync({
      useFactory: (wuproyectConfig: WuproyectConfig) => ({
        uri: wuproyectConfig.envConfig.database_url,
      }),
      inject: [WuproyectConfig],
    }),
    ScheduleModule.forRoot(),
    ArticlesModule,
    ApiModule,
  ],
})
export class AppModule {}
