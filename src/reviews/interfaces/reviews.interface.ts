import { Document } from 'mongoose';

export interface IReview extends Document {
  readonly review: string;
  readonly author: string;
  readonly review_source: string;
  readonly rating: number;
  readonly product_name: string;
  readonly reviewed_date: Date;
}
