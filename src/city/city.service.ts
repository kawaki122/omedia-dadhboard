import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CampaignService } from 'src/campaign/services/campaign.service';
import { CityDto } from './dto/city.dto';
import { City, CityDocument } from './schemas/city.schema';

@Injectable()
export class CityService {
  constructor(
    @InjectModel(City.name)
    private readonly cityModel: Model<CityDocument>,
    private readonly campaignService: CampaignService,
  ) {}

  getAllCities() {
    return this.cityModel.find().exec();
  }

  addNewCity(city: CityDto) {
    if (city.cityId) {
      return this.cityModel.findByIdAndUpdate(
        city.cityId,
        { title: city.title },
        { new: true },
      );
    } else {
      return this.cityModel.create({ title: city.title });
    }
  }

  async removeCity(cityId: string) {
    const city = await this.campaignService.findByCity(cityId);
    if (Boolean(city.length)) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'This city is in use.',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    return this.cityModel.findByIdAndRemove(cityId);
  }
}
