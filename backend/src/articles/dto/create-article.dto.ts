import {
  IsBoolean,
  IsDate,
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

  @IsDate()
  @IsNotEmpty()
  created_at: Date;

  @IsBoolean()
  @IsOptional()
  is_deleted?: boolean;

  @IsDate()
  @IsOptional()
  deleted_at?: Date;
}
