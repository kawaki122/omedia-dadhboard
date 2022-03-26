import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CampaignDto } from '../dto/campaign.dto';
import { Campaign, CampaignDocument } from '../schemas/campaign.schema';
import { Location, LocationDocument } from '../schemas/location.schema';
import { Review, ReviewDocument } from '../schemas/review.schema';
import { LocationService } from './location.service';
import { ReviewService } from './review.service';

@Injectable()
export class CampaignService {
  constructor(
    @InjectModel(Campaign.name)
    private readonly campaignModel: Model<CampaignDocument>,
    private readonly locationService: LocationService,
    private readonly reviewService: ReviewService,
  ) {}

  getAllCampaigns() {
    return this.campaignModel.find().populate('brand').exec();
  }

  async getCompleteCampaign(id) {
    const campaign = await this.campaignModel
      .findById(id)
      .populate({ path: 'brand', populate: { path: 'client' } })
      .populate('cities')
      .exec();
    const locations = await this.locationService.getByCompaign(id);
    const reviews = await this.reviewService.getByCampaign(id);

    return { campaign, locations, reviews };
  }

  async addNewCampaign(campaign: CampaignDto) {
    if (campaign.campaignId) {
      return this.campaignModel
        .findByIdAndUpdate(
          campaign.campaignId,
          {
            title: campaign.title,
            from: campaign.from,
            to: campaign.to,
            status: campaign.status,
            brand: campaign.brand,
            cities: campaign.cities,
          },
          { new: true },
        )
        .populate('brand');
    } else {
      const campn = await this.campaignModel.create({
        title: campaign.title,
        from: campaign.from,
        to: campaign.to,
        status: campaign.status,
        brand: campaign.brand,
        cities: campaign.cities,
      });
      return this.campaignModel.findById(campn._id).populate('brand');
    }
  }

  removeCampaign(campaignId: string) {
    return this.campaignModel.findByIdAndRemove(campaignId);
  }
}
