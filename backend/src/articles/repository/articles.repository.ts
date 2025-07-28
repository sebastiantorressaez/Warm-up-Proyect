import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Article, ArticleDocument } from '../schema/article.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateArticleDto } from '../dto/create-article.dto';
@Injectable()
export class ArticlesRepository {
  constructor(
    @InjectModel(Article.name)
    private readonly articlesModel: Model<ArticleDocument>,
  ) {}

  findAll(): Promise<ArticleDocument[]> {
    return this.articlesModel.find({ isDeteled: false }).exec();
  }

  findOne(objectID: string): Promise<ArticleDocument | null> {
    return this.articlesModel.findOne({ objectID, isDeteled: false }).exec();
  }

  create(article: CreateArticleDto): Promise<ArticleDocument> {
    return this.articlesModel.create(article);
  }

  softdelete(objectID: string): Promise<ArticleDocument | null> {
    return this.articlesModel
      .findOneAndUpdate(
        { objectID },
        { isDeteled: true, deleted_at: new Date() },
        { new: true },
      )
      .exec();
  }
}
