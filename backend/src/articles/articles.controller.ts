import { Controller, Get, Query } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';


@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get('fetch')
  async fetchArticles() {
    await this.articlesService.fetchArticles();
    return { message: 'Articles fetched and saved' };
  }

  @Get()
  async findAll(
    @Query() paginationQuery: PaginationQueryDto
  ) {
    return this.articlesService.findAll(paginationQuery);
  }

}
