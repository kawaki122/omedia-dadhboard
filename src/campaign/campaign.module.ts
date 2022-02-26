import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CampaignController } from './campaign.controller';
import { CampaignService } from './campaign.service';
import { Campaign, CampaignSchema } from './schemas/campaign.schema';

@Module({
  controllers: [CampaignController],
  providers: [CampaignService],
  imports: [MongooseModule.forFeature([{name: Campaign.name, schema: CampaignSchema}])],
})
export class CampaignModule {}
