import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Campaign } from './campaign.schema';
import { Location } from './location.schema';

export type ReviewDocument = Review & Document;

@Schema()
export class Review {
  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  avatar: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true, ref: Campaign.name })
  campaign: string;

  @Prop({ required: true, ref: Location.name })
  location: string;

  @Prop({ default: Date.now() })
  createdAt: Date;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
