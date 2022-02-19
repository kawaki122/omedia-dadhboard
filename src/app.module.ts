import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BrandModule } from './brand/brand.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/omedia'), BrandModule, UploadModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
