import { IsString } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  objectID: string;

  @IsString()
  author: string;

  @IsString()
  title: string;

  @IsString()
  story_title: string;

  @IsString()
  url: string;

  @IsString()
  story_url: string;

  @IsString()
  created_at: string;
}
