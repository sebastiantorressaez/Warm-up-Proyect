import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ArticleDocument = Article & Document;

@Schema()
export class Article {
  @Prop({ unique: true })
  objectID: string;

  @Prop()
  title: string;

  @Prop()
  author: string;

  @Prop()
  createdAt: Date;

  @Prop()
  url: string;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
