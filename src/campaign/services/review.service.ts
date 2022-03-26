import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReviewDto } from '../dto/review.dto';
import { Review, ReviewDocument } from '../schemas/review.schema';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name)
    private readonly reviewModel: Model<ReviewDocument>,
  ) {}

  getByCampaign(id) {
    return this.reviewModel.find({ campaign: id }).exec();
  }

  async addReview(review: ReviewDto) {
    const result = await this.reviewModel.create({
      author: review.author,
      avatar: review.avatar,
      content: review.content,
      campaign: review.campaign,
      location: review.location,
      createdAt: Date.now(),
    });
    return this.reviewModel.findById(result._id).exec();
  }

  async updateReviews(reviews: any) {
    for (const review of reviews) {
      if(review.content) {
        await this.reviewModel.findByIdAndUpdate(review._id, {content: review.content})
      } else {
        await this.reviewModel.findByIdAndRemove(review._id);
      }
    }
    return "Done"
  }
}
