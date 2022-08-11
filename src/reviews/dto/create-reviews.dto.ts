import {
  IsString,
  IsNumber,
  IsDate,
} from 'class-validator';

export class CreateReviewDto {
  @IsString()
  readonly review: string;

  @IsString()
  readonly author: string;

  @IsString()
  readonly review_source: string;

  @IsNumber()
  readonly rating: number;

  @IsString()
  readonly product_name: string;

  @IsDate()
  readonly reviewed_date: Date;
}
