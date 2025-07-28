import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from '../dto/create-article.dto';
import { ArticlesRepository } from '../repository/articles.repository';
import { ArticleDocument } from '../schema/article.schema';

@Injectable()
export class ArticlesService {
  constructor(private readonly articleRepository: ArticlesRepository) {}

  async findArticles(): Promise<ArticleDocument[]> {
    const articles = await this.articleRepository.findAll();
    if (!articles.length) throw new NotFoundException('No articles found');
    return articles
  }

  async findArticle(objectID: string): Promise<ArticleDocument> {
    const article = await this.articleRepository.findOne(objectID);
    if (!article) throw new NotFoundException(`Article #${objectID} not found`);
    return article;
  }

  async createArticle(createArticleDto: CreateArticleDto): Promise<ArticleDocument> {
    const exists = await this.articleRepository.findOne(createArticleDto.objectID);
    if (exists) throw new ConflictException(`Article #${createArticleDto.objectID} already exists`);
    return this.articleRepository.create(createArticleDto);
  }

  async deleteArticle(objectID: string): Promise<ArticleDocument | null> {
    await this.findArticle(objectID);
    return this.articleRepository.softdelete(objectID);
  }
}
