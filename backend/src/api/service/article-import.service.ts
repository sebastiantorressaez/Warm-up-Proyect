import { ConflictException, Injectable, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CreateArticleDto } from 'src/articles/dto/create-article.dto';
import { ArticlesService } from 'src/articles/service/articles.service';
import { ApiService } from './api.service';

@Injectable()
export class ArticleImportService implements OnModuleInit {
  constructor(
    private readonly apiService: ApiService,
    private readonly articlesService: ArticlesService,
  ) {}

  async onModuleInit() {
    await this.handleApiData();
  }

  @Cron(CronExpression.EVERY_HOUR)
  async handleApiData() {
    const articles = await this.apiService.getApiData();

    const resultPromises = Promise.all(
      articles.map(async (article: CreateArticleDto) => {
        try {
          return await this.articlesService.createArticle(article);
        } catch (error) {
          if (error instanceof ConflictException) {
            return null;
          }
          throw error;
        }
      }),
    );

    return resultPromises;
  }
}
