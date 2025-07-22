import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Article, ArticleDocument } from '../schema/article.schema';
import { Model } from 'mongoose';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { CreateArticleDto } from '../dto/create-article.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article.name)
    private readonly articleModel: Model<ArticleDocument>,
  ) {}

  createArticle(createArticleDto: CreateArticleDto) {
    return this.articleModel.create(createArticleDto);
  }

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.articleModel
      .find()
      .skip(offset)
      .limit(limit)
      .sort({ createdAt: -1 })
      .exec();
  }
}
