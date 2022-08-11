import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Post,
  Body,
  Put,
  NotFoundException,
  Delete,
  Param,
  Query,
} from '@nestjs/common';
import { QueryDto } from '../common/dto/query.dto';
import { ApiTags } from '@nestjs/swagger';
import { ReviewService } from './reviews.service';
import { CreateReviewDto, UpdateReviewDto } from './dto';

@ApiTags('reviews')
@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  public async getAllReviews(@Res() res, @Query() query: QueryDto) {
    const reviews = await this.reviewService.findAll(query);
    return res.status(HttpStatus.OK).json(reviews);
  }

  @Get('/:id')
  public async getReview(@Res() res, @Param('id') reviewId: string) {
    if (!reviewId) {
      throw new NotFoundException('Review does not exist!');
    }

    const review = await this.reviewService.findOne(reviewId);
    return res.status(HttpStatus.OK).json(review);
  }

  @Post()
  public async addReview(@Res() res, @Body() createReviewDto: CreateReviewDto) {
    try {
      const review = await this.reviewService.create(createReviewDto);
      return res.status(HttpStatus.OK).json({
        message: 'review has been created successfully',
        review,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: review not created!',
        status: 400,
      });
    }
  }

  @Put('/:id')
  public async updateReview(
    @Res() res,
    @Param('id') reviewId: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    try {
      const review = await this.reviewService.update(reviewId, updateReviewDto);
      if (!review) {
        throw new NotFoundException('review does not exist!');
      }
      return res.status(HttpStatus.OK).json({
        message: 'review has been successfully updated',
        review,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: review not updated!',
        status: 400,
      });
    }
  }

  @Delete('/:id')
  public async deleteReview(@Res() res, @Param('id') reviewId: string) {
    if (!reviewId) {
      throw new NotFoundException('review ID does not exist');
    }

    const review = await this.reviewService.remove(reviewId);

    return res.status(HttpStatus.OK).json({
      message: 'review has been deleted',
      review,
    });
  }

  @Post('/monthlyAvg')
  public async getRatingsMonthlyAverage(@Res() res): Promise<any> {
    const data = await this.reviewService.ratingsMonthlyAverage();
    return res.status(HttpStatus.OK).json(data);
  }

  @Post('/ratingCount')
  public async getRatingCount(@Res() res): Promise<any> {
    const data = await this.reviewService.ratingsCount();
    return res.status(HttpStatus.OK).json(data);
  }
}
