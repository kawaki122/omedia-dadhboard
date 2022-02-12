import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BrandModule } from './brand/brand.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/omedia'), BrandModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
