import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ArticlesService } from '../service/articles.service';
import { ArticleDocument } from '../schema/article.schema';
import { CreateArticleDto } from '../dto/create-article.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  findAll(): Promise<ArticleDocument[]> {
    return this.articlesService.findArticles();
  }

  @Get(':objectID')
  findOne(@Param('objectID') objectID: string): Promise<ArticleDocument> {
    return this.articlesService.findArticle(objectID);
  }

  @Post()
  create(@Body() createArticleDto: CreateArticleDto): Promise<ArticleDocument> {
    return this.articlesService.createArticle(createArticleDto);
  }

  @Delete(':objectID')
  delete(@Param('objectID') objectID: string): Promise<ArticleDocument | null> {
    return this.articlesService.deleteArticle(objectID);
  }
}
