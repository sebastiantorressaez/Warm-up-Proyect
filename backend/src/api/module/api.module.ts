import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ApiService } from '../service/api.service';
import { ArticlesModule } from '../../articles/module/articles.module';

@Module({
  imports: [HttpModule, ArticlesModule],
  providers: [ApiService],
})
export class ApiModule {}
