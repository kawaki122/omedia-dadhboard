import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CampaignController } from './campaign.controller';
import { CampaignService } from './campaign.service';
import { Campaign, CampaignSchema } from './schemas/campaign.schema';
import { Location, LocationSchema } from './schemas/location.schema';
import { Review, ReviewSchema } from './schemas/review.schema';

@Module({
  controllers: [CampaignController],
  providers: [CampaignService],
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
