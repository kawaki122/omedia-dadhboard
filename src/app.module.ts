import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { BrandModule } from './brand/brand.module';
import { CampaignModule } from './campaign/campaign.module';
import { CityModule } from './city/city.module';
import { ClientModule } from './client/client.module';
import { CommonModule } from './common/common.module';
import { UploadModule } from './upload/upload.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      // process.env.MONGODB_STORE_URI || 'mongodb://localhost/omedia',
      'mongodb+srv://omedia:omedia@cluster0.znyo4.mongodb.net/omediadb?retryWrites=true&w=majority',
    ),
    BrandModule,
    UploadModule,
    CityModule,
    ClientModule,
    CampaignModule,
    CommonModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
