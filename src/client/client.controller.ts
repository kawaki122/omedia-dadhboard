import { Body, Controller, Delete, Get, Patch, Query } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientDto } from './dto/client.dto';

@Controller('client')
export class ClientController {
    constructor(
        private readonly clientService: ClientService
    ) { }

    @Get()
    getAll(){
        return this.clientService.getAllClients();
    }

    @Delete()
    remove(@Query() query){
        return this.clientService.removeClient(query.id);
    }

    @Patch()
    addClient(@Body() body: ClientDto) {
        return this.clientService.addNewClient(body);
    }
}
