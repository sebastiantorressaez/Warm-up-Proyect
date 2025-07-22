import { HttpService } from '@nestjs/axios';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { firstValueFrom, map } from 'rxjs';
import { ArticlesService } from '../../articles/service/articles.service';
import { CreateArticleDto } from 'src/articles/dto/create-article.dto';

@Injectable()
export class ApiService implements OnModuleInit {
  constructor(
    private readonly httpService: HttpService,
    private readonly articlesService: ArticlesService,
  ) {}

  async onModuleInit() {
    await this.getData();
  }

  // @Cron(CronExpression.EVERY_HOUR)
  async getData() {
    const data = await firstValueFrom(
      this.httpService
        .get('https://hn.algolia.com/api/v1/search_by_date?query=nodejs')
        .pipe(map((response) => response.data)),
    );

    const validArticles = data.hits
      .filter((hit) => hit.title || hit.story_title)
      .map((hit) => ({
        objectID: hit.objectID,
        title: hit.story_title ?? hit.title,
        author: hit.author,
        createdAt: hit.created_at,
        url: hit.story_url ?? hit.url ?? '',
      }));

    await Promise.all(
      validArticles.map((article: CreateArticleDto) => {
        return this.articlesService.createArticle(article);
      })
    )
  }
}
