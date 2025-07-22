import { Module } from '@nestjs/common';
import { ArticlesModule } from './articles/module/articles.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { ApiModule } from './api/module/api.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongo:27017/hacker-news'),
    ScheduleModule.forRoot(),
    ArticlesModule,
    ApiModule,
  ],
})
export class AppModule {}
