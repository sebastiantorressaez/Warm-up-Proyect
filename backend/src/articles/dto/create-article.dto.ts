import {
  IsBoolean,
  IsDate,
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
  title: string;

  @IsUrl()
  @IsNotEmpty()
  url: string;

  @IsDateString()
  @IsNotEmpty()
  created_at: string;

  @IsBoolean()
  @IsOptional()
  isDeteled: boolean;

  @IsDateString()
  @IsOptional()
  deleted_at: string | null;
}
