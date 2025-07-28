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
  story_title: string;

  @Prop()
  author: string;

  @Prop()
  url: string;

  @Prop()
  story_url: string;

  @Prop()
  created_at: string;

  @Prop({ default: false })
  isDeteled: boolean;

  @Prop({ default: null })
  deleted_at: string;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
