import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Article, ArticleDocument } from './schema/article.schema';
import { Model } from 'mongoose';
import { HttpService } from '@nestjs/axios';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article.name)
    private readonly articleModel: Model<ArticleDocument>,
    private readonly httpService: HttpService,
  ) {}

  async fetchArticles() {
    await this.articleModel.deleteMany({});

    const response = await this.httpService.axiosRef.get(
      'https://hn.algolia.com/api/v1/search_by_date?query=nodejs',
    );
    const hits = response.data.hits;

    const articlesToInsert = hits
      .filter((hit) => hit.story_title || hit.title)
      .map((hit) => ({
        objectID: hit.objectID,
        title: hit.story_title ?? hit.title,
        author: hit.author,
        createdAt: new Date(hit.created_at),
        url: hit.story_url ?? hit.url ?? null,
      }));

    if (articlesToInsert.length > 0) {
      await this.articleModel.insertMany(articlesToInsert, { ordered: false });
    }
  }


  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.articleModel.find().skip(offset).limit(limit).sort({ createdAt: -1 }).exec();
  }


}
