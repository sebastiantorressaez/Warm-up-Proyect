import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Article, ArticleDocument } from '../schema/article.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateArticleDto } from '../dto/create-article.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

@Injectable()
export class ArticlesRepository {
  constructor(
    @InjectModel(Article.name)
    private readonly articlesModel: Model<ArticleDocument>,
  ) {}

  findAll(paginationQuery: PaginationQueryDto): Promise<ArticleDocument[]> {
    const { limit, offset } = paginationQuery;
    return this.articlesModel
      .find()
      .skip(offset)
      .limit(limit)
      .sort({ createdAt: -1 })
      .exec();
  }

  findOne(objectID: string): Promise<ArticleDocument | null> {
    return this.articlesModel.findOne({ objectID }).exec();
  }

  create(article: CreateArticleDto): Promise<ArticleDocument> {
    return this.articlesModel.create(article);
  }

  delete(objectID: string): Promise<ArticleDocument | null> {
    return this.articlesModel.findOneAndDelete({ objectID }).exec();
  }
}
