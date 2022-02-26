import { Body, Controller, Delete, Get, Patch, Query } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CampaignDto } from './dto/campaign.dto';

@Controller('campaign')
export class CampaignController {
    constructor(
        private readonly campaignService: CampaignService
    ) { }

    @Get()
    getAll(){
        return this.campaignService.getAllCities();
    }

    @Delete()
    remove(@Query() query){
        return this.campaignService.removeCampaign(query.id);
    }

    @Patch()
    addCampaign(@Body() body: CampaignDto) {
        return this.campaignService.addNewCampaign(body);
    }
}
