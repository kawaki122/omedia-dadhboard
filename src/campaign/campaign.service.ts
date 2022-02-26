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

    getAllCities(){
        return this.campaignModel.find().exec();
    }

    addNewCampaign(campaign: CampaignDto){
        if(campaign.campaignId) {
            return this.campaignModel.findByIdAndUpdate(campaign.campaignId, {title: campaign.title}, {new: true});
        } else {
            return this.campaignModel.create({title: campaign.title});
        }
    }

    removeCampaign(campaignId: string){
        return this.campaignModel.findByIdAndRemove(campaignId)
    }
}
