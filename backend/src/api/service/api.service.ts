import { HttpService } from '@nestjs/axios';
import { ConflictException, Injectable, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { firstValueFrom, map } from 'rxjs';
import { ArticlesService } from '../../articles/service/articles.service';
import { CreateArticleDto } from 'src/articles/dto/create-article.dto';
import { ConfigService } from '@nestjs/config';
import { WuproyectConfig } from 'src/config/wu-proyect.config';

@Injectable()
export class ApiService implements OnModuleInit {
  constructor(
    private readonly httpService: HttpService,
    private readonly articlesService: ArticlesService,
    private readonly wuproyectConfig: WuproyectConfig,
  ) {}

  async onModuleInit() {
    await this.handleApiDate();
  }

  getApiData() {
    const api_url = this.wuproyectConfig.envConfig.external_api_url;

    const data = firstValueFrom(
      this.httpService.get(api_url).pipe(map((response) => response.data.hits)),
    );

    return data;
  }

  @Cron(CronExpression.EVERY_HOUR)
  async handleApiDate() {
    const articles = await this.getApiData();

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
