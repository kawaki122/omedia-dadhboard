import { Body, Controller, Patch } from '@nestjs/common';
import { ReviewDto } from '../dto/review.dto';
import { ReviewService } from '../services/review.service';

@Controller('review')
export class ReviewController {
    constructor(
        private readonly reviewService: ReviewService
    ) { }

    @Patch()
    addReview(@Body() body: ReviewDto) {
        return this.reviewService.addReview(body);
    }
}
