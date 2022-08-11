import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { QueryDto } from '../common/dto/query.dto';
import { Review } from './schemas/reviews.schema';
import { CreateReviewDto, UpdateReviewDto } from './dto';
import { IReview } from './interfaces/reviews.interface';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name)
    private readonly reviewModel: Model<Review>,
  ) {}

  public async findAll(queryDto: QueryDto): Promise<Review[]> {
    const { limit, skip, query } = queryDto;
    return await this.reviewModel
      .find(query ? JSON.parse(query) : {})
      .skip(skip)
      .limit(limit)
      .exec();
  }

  public async findOne(reviewId: string): Promise<Review> {
    const review = await this.reviewModel.findById({ _id: reviewId }).exec();

    if (!review) {
      throw new NotFoundException(`Review #${reviewId} not found`);
    }

    return review;
  }

  public async create(createReeviewDto: CreateReviewDto): Promise<IReview> {
    const review = await this.reviewModel.create(createReeviewDto);
    return review;
  }

  public async update(
    reviewId: string,
    updateReviewDto: UpdateReviewDto,
  ): Promise<IReview> {
    const existingReview = await this.reviewModel.findByIdAndUpdate(
      { _id: reviewId },
      updateReviewDto,
      { new: true },
    );

    if (!existingReview) {
      throw new NotFoundException(`Review #${reviewId} not found`);
    }
    return existingReview;
  }

  public async remove(reviewId: string): Promise<any> {
    const review = await this.reviewModel.findByIdAndRemove(reviewId);
    return review;
  }

  public async ratingsMonthlyAverage(): Promise<any> {
    const data = await this.reviewModel.aggregate([
      {
        $group: {
          _id: {
            store: '$review_source',
            month: { $substr: ['$reviewed_date', 0, 7] },
          },
          AverageValue: { $avg: '$rating' },
        },
      },
    ]);
    return data;
  }

  public async ratingsCount(): Promise<any> {
    const data = await this.reviewModel.aggregate([

      {
        $group: {
          _id: '$rating',count: { $sum: 1 } ,
        },
      },
    ]);
    return data;
  }
}
