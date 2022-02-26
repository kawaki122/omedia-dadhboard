import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BrandModule } from './brand/brand.module';
import { CampaignModule } from './campaign/campaign.module';
import { CityModule } from './city/city.module';
import { ClientModule } from './client/client.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/omedia'), BrandModule, UploadModule, CityModule, ClientModule, CampaignModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
