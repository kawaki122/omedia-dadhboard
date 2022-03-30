import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CampaignService } from 'src/campaign/services/campaign.service';
import { BrandDto } from './dto/brand.dto';
import { Brand, BrandDocument } from './schemas/brand.schema';

@Injectable()
export class BrandService {
  constructor(
    @InjectModel(Brand.name)
    private readonly brandModel: Model<BrandDocument>,
    private readonly campaignService: CampaignService,
  ) {}

  getAllBrands() {
    return this.brandModel.find().exec();
  }

  addNewBrand(brand: BrandDto) {
    if (brand.brandId) {
      return this.brandModel.findByIdAndUpdate(
        brand.brandId,
        { title: brand.title, img: brand.img, client: brand.client },
        { new: true },
      );
    } else {
      return this.brandModel.create({
        title: brand.title,
        client: brand.client,
        img: brand.img,
      });
    }
  }

  async removeBrand(brandId: string) {
    const camp = await this.campaignService.findByBrand(brandId);
    if (Boolean(camp.length)) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'This brand is in use.',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    return this.brandModel.findByIdAndRemove(brandId);
  }

  getByClient(clientId: string) {
    return this.brandModel.find({ client: clientId }).exec();
  }
}
