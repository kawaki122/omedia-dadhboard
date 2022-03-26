import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CampaignController } from './controllers/campaign.controller';
import { CampaignService } from './services/campaign.service';
import { Campaign, CampaignSchema } from './schemas/campaign.schema';
import { Location, LocationSchema } from './schemas/location.schema';
import { Review, ReviewSchema } from './schemas/review.schema';
import { LocationController } from './controllers/location.controller';
import { ReviewService } from './services/review.service';
import { ReviewController } from './controllers/review.controller';
import { LocationService } from './services/location.service';

@Module({
  controllers: [CampaignController, LocationController, ReviewController],
  providers: [CampaignService, ReviewService, LocationService],
  imports: [MongooseModule.forFeature([{
    name: Campaign.name,
    schema: CampaignSchema,
  },
  {
    name: Location.name,
    schema: LocationSchema,
  },
  {
    name: Review.name,
    schema: ReviewSchema,
  }])],
})
export class CampaignModule { }
