import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { locationEnum } from '../dto/constants';
import { Campaign } from './campaign.schema';

export type LocationDocument = Location & Document;

@Schema()
export class Location {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  address: string;

  @Prop({ default: 0 })
  longitude: number;

  @Prop({ default: 0 })
  latitude: number;

  @Prop({ default: [] })
  photos: string[];

  @Prop({ default: locationEnum.PENDING })
  status: locationEnum;

  @Prop({ default: '' })
  feedBack: string;

  @Prop({ default: '' })
  size: string;

  @Prop({ default: '' })
  tflow: string;

  @Prop({ required: true, ref: Campaign.name })
  campaign: string;

  @Prop({ required: true, default: Date.now() })
  createdAt: Date;

  @Prop({ required: true, default: Date.now() })
  updatedAt: Date;
}

export const LocationSchema = SchemaFactory.createForClass(Location);
