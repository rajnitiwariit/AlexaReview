import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Review extends Document {
  @Prop()
  review: string;
  @Prop()
  author: string;
  @Prop()
  review_source: string;
  @Prop()
  rating: number;
  @Prop()
  product_name: string;
  @Prop()
  reviewed_date: Date;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
