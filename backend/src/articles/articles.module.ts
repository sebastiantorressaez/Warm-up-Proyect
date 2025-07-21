import { Module } from '@nestjs/common';
import { ArticlesController } from './articles.controller';
import { Article, ArticleSchema } from './schema/article.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { ArticlesService } from './articles.service';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]),
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService]
})
export class ArticlesModule {}
