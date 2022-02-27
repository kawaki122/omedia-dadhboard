import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CampaignDto } from './dto/campaign.dto';
import { Campaign, CampaignDocument } from './schemas/campaign.schema';

@Injectable()
export class CampaignService {
    constructor(
        @InjectModel(Campaign.name)
        private readonly campaignModel: Model<CampaignDocument>
    ) { }

    getAllCampaigns() {
        return this.campaignModel.find().populate('brand').exec();
    }

    async addNewCampaign(campaign: CampaignDto) {
        if (campaign.campaignId) {
            return this.campaignModel.findByIdAndUpdate(
                campaign.campaignId,
                {
                    title: campaign.title,
                    from: campaign.from,
                    to: campaign.to,
                    status: campaign.status,
                    brand: campaign.brand
                },
                { new: true }
            ).populate('brand');
        } else {
            const campn = await this.campaignModel.create({
                title: campaign.title,
                from: campaign.from,
                to: campaign.to,
                status: campaign.status,
                brand: campaign.brand
            })
            return this.campaignModel.findById(campn._id).populate('brand');
        }
    }

    removeCampaign(campaignId: string) {
        return this.campaignModel.findByIdAndRemove(campaignId)
    }
}
