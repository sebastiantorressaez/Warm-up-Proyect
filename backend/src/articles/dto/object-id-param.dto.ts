import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class ObjectIdParamDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d+$/, { message: 'objectID must contain only digits' })
  objectID: string;
}
