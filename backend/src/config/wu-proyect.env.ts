import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class WuproyectEnv {
  @IsString()
  @IsNotEmpty()
  EXTERNAL_API_URL: string;

  @IsString()
  @IsNotEmpty()
  DATABASE_URL: string;

  @IsNumber()
  @IsNotEmpty()
  PORT: number;
}
