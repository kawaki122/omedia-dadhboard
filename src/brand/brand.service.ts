import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BrandDto } from './dto/brand.dto';
import { Brand, BrandDocument } from './schemas/brand.schema';

@Injectable()
export class BrandService {
    constructor(
        @InjectModel(Brand.name)
        private readonly brandModel: Model<BrandDocument>
    ) { }

    getAllBrands(){
        return this.brandModel.find().exec();
    }

    addNewBrand(brand: BrandDto){
        if(brand.brandId) {
            return this.brandModel.findByIdAndUpdate(brand.brandId, {title: brand.title, img: brand.img}, {new: true});
        } else {
            return this.brandModel.create({title: brand.title, img: brand.img});
        }
    }

    removeBrand(brandId: string){
        return this.brandModel.findByIdAndRemove(brandId)
    }
}
