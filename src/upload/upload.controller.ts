import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { UploadDto } from './dto/brand.dto';

@Controller('upload')
export class UploadController {
    constructor(
    ) { }

    @Post()
    upload(@Body() body: UploadDto) {
        // return this.brandService.addNewBrand(body);
    }
}
