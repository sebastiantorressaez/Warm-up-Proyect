import { HttpService } from '@nestjs/axios';
import { ConflictException, Injectable, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { firstValueFrom, map } from 'rxjs';
import { ArticlesService } from '../../articles/service/articles.service';
import { CreateArticleDto } from 'src/articles/dto/create-article.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiService implements OnModuleInit {
  constructor(
    private readonly httpService: HttpService,
    private readonly articlesService: ArticlesService,
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit() {
    await this.handleApiDate();
  }

  getApiData() {
    const api_url = this.configService.get('EXTERNAL_API_URL');

    const data = firstValueFrom(
      this.httpService.get(api_url).pipe(map((response) => response.data.hits)),
    );

    return data;
  }

  @Cron(CronExpression.EVERY_HOUR)
  async handleApiDate() {
    const articles = await this.getApiData();

    const promises = articles.map(async (article: CreateArticleDto) => {
      try {
        return await this.articlesService.createArticle(article);
      } catch (error) {
        if (error instanceof ConflictException) {
          return null;
        }
        throw error;
      }
    });

    return Promise.all(promises);
  }
}
