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
  created_at: Date;

  @IsBoolean()
  @IsOptional()
  isDetele: boolean;

  @IsDateString()
  @IsOptional()
  deleted_at: Date;
}
