import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticlesModule } from './articles/articles.module';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongo:27017/hacker-news'),
    ArticlesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
