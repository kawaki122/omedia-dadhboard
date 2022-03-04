import { Body, Controller, Delete, Get, Patch, Query } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CampaignDto, CampaignIdDto } from './dto/campaign.dto';
import { LocationDto } from './dto/location.dto';

@Controller('campaign')
export class CampaignController {
    constructor(
        private readonly campaignService: CampaignService
    ) { }

    @Get()
    getAll(){
        return this.campaignService.getAllCampaigns();
    }

    @Get('complete')
    getComplete(@Query() query: CampaignIdDto){
        return this.campaignService.getCompleteCampaign(query.id);
    }

    @Delete()
    remove(@Query() query: CampaignIdDto){
        return this.campaignService.removeCampaign(query.id);
    }

    @Patch()
    addCampaign(@Body() body: CampaignDto) {
        return this.campaignService.addNewCampaign(body);
    }

    @Patch('location')
    addLocation(@Body() body: LocationDto) {
        return this.campaignService.upsertLocation(body);
    }
}
