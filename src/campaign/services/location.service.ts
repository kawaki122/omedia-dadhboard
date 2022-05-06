import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Brand } from 'src/brand/schemas/brand.schema';
import { locationEnum } from '../dto/constants';
import { LocationDto } from '../dto/location.dto';
import { LocationUpdateDto } from '../dto/location.update.dto';
import { Location, LocationDocument } from '../schemas/location.schema';
import { ReviewService } from './review.service';

@Injectable()
export class LocationService {
  constructor(
    @InjectModel(Location.name)
    private readonly locationModel: Model<LocationDocument>,
    private readonly reviewService: ReviewService,
  ) {}

  getByCompaign(id) {
    return this.locationModel.find({ campaign: id }).exec();
  }

  async getClientLocations(clientId) {
    const locations = await this.locationModel
      .find({ status: locationEnum.ACTIVE })
      .populate<{ campaign: { brand: Brand } }>({
        path: 'campaign',
        populate: { path: 'brand' },
      })
      .orFail()
      .exec();
    console.log(
      locations.filter((item) => item.campaign.brand.client === clientId),
    );
    return locations.filter((item) => item.campaign.brand.client === clientId);
  }

  async upsertLocation(location: LocationDto) {
    if (location.locationId) {
      return this.locationModel.findByIdAndUpdate(
        location.locationId,
        {
          title: location.title,
          address: location.address,
          campaign: location.campaign,
        },
        { new: true },
      );
    } else {
      const locationRes = await this.locationModel.create({
        title: location.title,
        address: location.address,
        campaign: location.campaign,
      });
      return this.locationModel.findById(locationRes._id).exec();
    }
  }

  async saveLocationChanges(payload: LocationUpdateDto) {
    const result = await this.reviewService.updateReviews(payload.reviews);
    return this.updateLocation(payload);
  }

  updateLocation(payload: LocationUpdateDto) {
    return this.locationModel.findByIdAndUpdate(payload._id, {
      address: payload.address,
      campaign: payload.campaign,
      photos: payload.photos,
      size: payload.size,
      status: payload.status,
      tflow: payload.tflow,
      title: payload.title,
    });
  }
}
