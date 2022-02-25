import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClientDto } from './dto/client.dto';
import { Client, ClientDocument } from './schemas/client.schema';

@Injectable()
export class ClientService {
    constructor(
        @InjectModel(Client.name)
        private readonly clientModel: Model<ClientDocument>
    ) { }

    getAllClients() {
        return this.clientModel.find().exec();
    }

    addNewClient(client: ClientDto){
        if(client.clientId) {
            return this.clientModel.findByIdAndUpdate(client.clientId, {name: client.name, img: client.img}, {new: true});
        } else {
            return this.clientModel.create({name: client.name, img: client.img});
        }
    }

    removeClient(clientId: string){
        return this.clientModel.findByIdAndRemove(clientId)
    }
}
