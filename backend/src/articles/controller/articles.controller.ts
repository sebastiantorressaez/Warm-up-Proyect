import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ArticlesService } from '../service/articles.service';
import { ArticleDocument } from '../schema/article.schema';
import { CreateArticleDto } from '../dto/create-article.dto';
import { ObjectIdParamDto } from '../dto/object-id-param.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  findAll(): Promise<ArticleDocument[]> {
    return this.articlesService.findArticles();
  }

  @Get(':objectID')
  findOne(@Param() params: ObjectIdParamDto): Promise<ArticleDocument> {
    return this.articlesService.findArticle(params.objectID);
  }

  @Post()
  create(@Body() createArticleDto: CreateArticleDto): Promise<ArticleDocument> {
    return this.articlesService.createArticle(createArticleDto);
  }

  @Delete(':objectID')
  delete(@Param() params: ObjectIdParamDto): Promise<ArticleDocument | null> {
    return this.articlesService.deleteArticle(params.objectID);
  }
}
