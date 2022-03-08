import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { throws } from 'assert';
import { Model } from 'mongoose';
import { CampaignDto } from './dto/campaign.dto';
import { LocationDto } from './dto/location.dto';
import { ReviewDto } from './dto/review.dto';
import { Campaign, CampaignDocument } from './schemas/campaign.schema';
import { Location, LocationDocument } from './schemas/location.schema';
import { Review, ReviewDocument } from './schemas/review.schema';

@Injectable()
export class CampaignService {
  constructor(
    @InjectModel(Campaign.name)
    private readonly campaignModel: Model<CampaignDocument>,
    @InjectModel(Location.name)
    private readonly locationModel: Model<LocationDocument>,
    @InjectModel(Review.name)
    private readonly reviewModel: Model<ReviewDocument>,
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
    const locations = await this.locationModel.find({ campaign: id }).exec();
    const reviews = await this.reviewModel.find({ campaign: id }).exec();

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

  async upsertLocation(location: LocationDto) {
    if (location.locationId) {
      return this.locationModel.findByIdAndUpdate(
        location.locationId,
        {
          title: location.title,
          address: location.address,
          campaign: location.campaign,
        },
        { new: true },
      );
    } else {
      const locationRes = await this.locationModel.create({
        title: location.title,
        address: location.address,
        campaign: location.campaign,
      });
      return this.locationModel.findById(locationRes._id).exec();
    }
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

  removeCampaign(campaignId: string) {
    return this.campaignModel.findByIdAndRemove(campaignId);
  }
}
