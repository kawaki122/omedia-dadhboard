import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BrandController } from './brand.controller';
import { BrandService } from './brand.service';
import { Brand, BrandSchema } from './schemas/brand.schema';

@Module({
  controllers: [BrandController],
  providers: [BrandService],
  imports: [MongooseModule.forFeature([{name: Brand.name, schema: BrandSchema}])],
})
export class BrandModule {}
