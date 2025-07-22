import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ArticlesService } from '../service/articles.service';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { CreateArticleDto } from '../dto/create-article.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  async findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.articlesService.findArticles(paginationQuery);
  }

  @Get(':objectID')
  findOne(@Param('objectID', ParseIntPipe) id: number) {
    return this.articlesService.findArticle('' + id);
  }

  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.createArticle(createArticleDto);
  }

  @Delete(':objectID')
  delete(@Param('objectID') id: string) {
    return this.articlesService.deteleArcticle(id);
  }
}
