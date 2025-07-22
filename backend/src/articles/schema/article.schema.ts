import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ArticleDocument = HydratedDocument<Article>;

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
