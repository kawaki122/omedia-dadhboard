import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BrandModule } from 'src/brand/brand.module';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { Client, ClientSchema } from './schemas/client.schema';

@Module({
  controllers: [ClientController],
  providers: [ClientService],
  imports: [
    MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }]),
    BrandModule,
  ],
  exports: [ClientService],
})
export class ClientModule {}
