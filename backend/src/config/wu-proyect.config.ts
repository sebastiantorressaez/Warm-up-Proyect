import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WuproyectConfig {
  constructor(private readonly config: ConfigService) {}
  get envConfig(): {
    external_api_url: string;
    database_url: string;
    port: number;
  } {
    return {
      external_api_url: this.config.get<string>('EXTERNAL_API_URL')!,
      database_url: this.config.get<string>('DATABASE_URL')!,
      port: this.config.get<number>('PORT')!,
    };
  }
}
