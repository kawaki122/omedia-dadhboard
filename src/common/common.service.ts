import { Injectable } from '@nestjs/common';
import { BrandService } from 'src/brand/brand.service';
import { CityService } from 'src/city/city.service';
import { ClientService } from 'src/client/client.service';

@Injectable()
export class CommonService {
    constructor(
        private readonly cityService: CityService,
        private readonly brandService: BrandService,
        private readonly clientService: ClientService
    ) { }

    async getInitial() {
        const cities = await this.cityService.getAllCities();
        const brands = await this.brandService.getAllBrands();
        const clients = await this.clientService.getAllClients();
        return { cities, brands, clients }
    }
}
