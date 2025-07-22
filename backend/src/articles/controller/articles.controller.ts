import { Controller, Get, Query } from '@nestjs/common';
import { ArticlesService } from '../service/articles.service';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  async findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.articlesService.findAll(paginationQuery);
  }
}
