import { Injectable } from '@nestjs/common';
import { BrandService } from 'src/brand/brand.service';
import { CityService } from 'src/city/city.service';
import { ClientService } from 'src/client/client.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class CommonService {
  constructor(
    private readonly cityService: CityService,
    private readonly brandService: BrandService,
    private readonly clientService: ClientService,
    private readonly userService: UserService,
  ) {}

  async getInitial({ email }) {
    const cities = await this.cityService.getAllCities();
    const brands = await this.brandService.getAllBrands();
    const clients = await this.clientService.getAllClients();
    const user = await this.userService.findByEmail(email);
    return { cities, brands, clients, user };
  }
}
