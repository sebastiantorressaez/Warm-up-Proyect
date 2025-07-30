import { Global, Module } from '@nestjs/common';
import { WuproyectConfig } from './wu-proyect.config';

@Module({
  providers: [WuproyectConfig],
  exports: [WuproyectConfig],
  imports: [],
})
@Global()
export class WuproyectModule {}
