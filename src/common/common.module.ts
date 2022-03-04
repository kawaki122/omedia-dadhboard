import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BrandModule } from 'src/brand/brand.module';
import { CityModule } from 'src/city/city.module';
import { ClientModule } from 'src/client/client.module';
import { CommonController } from './common.controller';
import { CommonService } from './common.service';

@Module({
  controllers: [CommonController],
  providers: [CommonService],
  imports: [BrandModule, CityModule, ClientModule],
})
export class CommonModule {}
