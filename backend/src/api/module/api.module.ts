import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ApiService } from '../service/api.service';
import { ArticlesModule } from '../../articles/module/articles.module';
import { ArticleImportService } from '../service/article-import.service';

@Module({
  imports: [HttpModule, ArticlesModule],
  providers: [ApiService, ArticleImportService],
})
export class ApiModule {}
