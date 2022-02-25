import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CityDto } from './dto/city.dto';
import { City, CityDocument } from './schemas/city.schema';

@Injectable()
export class CityService {
    constructor(
        @InjectModel(City.name)
        private readonly cityModel: Model<CityDocument>
    ) { }

    getAllCities(){
        return this.cityModel.find().exec();
    }

    addNewCity(city: CityDto){
        if(city.cityId) {
            return this.cityModel.findByIdAndUpdate(city.cityId, {title: city.title}, {new: true});
        } else {
            return this.cityModel.create({title: city.title});
        }
    }

    removeCity(cityId: string){
        return this.cityModel.findByIdAndRemove(cityId)
    }
}
