import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { WuproyectEnv } from './wu-proyect.env';

export function WuproyectValidateConfig(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(WuproyectEnv, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(`Environment validation failed: ${errors}`);
  }

  return validatedConfig;
}
