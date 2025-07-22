import { Injectable } from '@nestjs/common';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { CreateArticleDto } from '../dto/create-article.dto';
import { ArticlesRepository } from '../repository/articles.repository';
import { ArticleDocument } from '../schema/article.schema';

@Injectable()
export class ArticlesService {
  constructor(private readonly articleRepository: ArticlesRepository) {}

  findArticles(paginationQuery: PaginationQueryDto): Promise<ArticleDocument[]> {
    return this.articleRepository.findAll(paginationQuery);
  }

  findArticle(objectID: string): Promise<ArticleDocument | null> {
    return this.articleRepository.findOne(objectID);
  }

  createArticle(createArticleDto: CreateArticleDto): Promise<ArticleDocument> {
    return this.articleRepository.create(createArticleDto);
  }

  deteleArcticle(objectID: string): Promise<ArticleDocument | null> {
    return this.articleRepository.delete(objectID);
  }
}
