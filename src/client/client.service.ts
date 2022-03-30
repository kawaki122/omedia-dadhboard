import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BrandService } from 'src/brand/brand.service';
import { ClientDto } from './dto/client.dto';
import { Client, ClientDocument } from './schemas/client.schema';

@Injectable()
export class ClientService {
  constructor(
    @InjectModel(Client.name)
    private readonly clientModel: Model<ClientDocument>,
    private readonly brandService: BrandService,
  ) {}

  getAllClients() {
    return this.clientModel.find().exec();
  }

  addNewClient(client: ClientDto) {
    if (client.clientId) {
      return this.clientModel.findByIdAndUpdate(
        client.clientId,
        { name: client.name, img: client.img },
        { new: true },
      );
    } else {
      return this.clientModel.create({ name: client.name, img: client.img });
    }
  }

  async removeClient(clientId: string) {
    const brand = await this.brandService.getByClient(clientId);
    if (Boolean(brand.length)) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'This client is in use.',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    return this.clientModel.findByIdAndRemove(clientId);
  }
}
