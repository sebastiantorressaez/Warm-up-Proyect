import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom, map } from 'rxjs';
import { WuproyectConfig } from 'src/config/wu-proyect.config';

@Injectable()
export class ApiService {
  constructor(
    private readonly httpService: HttpService,
    private readonly wuproyectConfig: WuproyectConfig,
  ) {}

  getApiData() {
    const api_url = this.wuproyectConfig.envConfig.external_api_url;

    const data = firstValueFrom(
      this.httpService.get(api_url).pipe(map((response) => response.data.hits)),
    );

    return data;
  }
}
