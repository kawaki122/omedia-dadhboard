import { Body, Controller, Delete, Get, Patch, Query } from '@nestjs/common';
import { CityService } from './city.service';
import { CityDto } from './dto/city.dto';

@Controller('city')
export class CityController {
    constructor(
        private readonly cityService: CityService
    ) { }

    @Get()
    getAll(){
        return this.cityService.getAllCities();
    }

    @Delete()
    remove(@Query() query){
        return this.cityService.removeCity(query.id);
    }

    @Patch()
    addCity(@Body() body: CityDto) {
        return this.cityService.addNewCity(body);
    }
}
