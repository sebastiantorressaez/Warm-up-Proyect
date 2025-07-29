import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  objectID: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsString()
  @IsNotEmpty()
  story_title: string;

  @IsUrl()
  @IsNotEmpty()
  story_url: string;

  @IsDateString()
  @IsNotEmpty()
  created_at: string;

  @IsBoolean()
  @IsOptional()
  is_deleted?: boolean;

  @IsDateString()
  @IsOptional()
  deleted_at?: string;
}
