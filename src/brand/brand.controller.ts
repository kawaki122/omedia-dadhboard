import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandDto } from './dto/brand.dto';

@Controller('brand')
export class BrandController {
    constructor(
        private readonly brandService: BrandService
    ) { }

    @Get()
    getAll(){
        return this.brandService.getAllBrands();
    }

    @Delete()
    remove(@Query() query){
        return this.brandService.removeBrand(query.id);
    }

    @Post()
    addBrand(@Body() body: BrandDto) {
        return this.brandService.addNewBrand(body);
    }
}
