import { HttpService } from '@nestjs/axios';
import { Injectable, OnModuleInit } from '@nestjs/common';
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
    await this.getData();
  }

  // @Cron(CronExpression.EVERY_HOUR)
  async getData() {
    const api_url = this.configService.get('EXTERNAL_API_URL');

    const data = await firstValueFrom(
      this.httpService.get(api_url).pipe(map((response) => response.data)),
    );

    await Promise.all(
      data.hits.map(async (article: CreateArticleDto) => {
        const newArticle = await this.articlesService.findArticle(
          article.objectID,
        );
        if (!newArticle) this.articlesService.createArticle(article);
      }),
    );
  }
}
