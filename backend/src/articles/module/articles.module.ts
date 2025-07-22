import { Module } from '@nestjs/common';
import { ArticlesController } from '../controller/articles.controller';
import { Article, ArticleSchema } from '../schema/article.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticlesService } from '../service/articles.service';
import { ArticlesRepository } from '../repository/articles.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]),
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService, ArticlesRepository],
  exports: [ArticlesService],
})
export class ArticlesModule {}
