import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Brand } from 'src/brand/schemas/brand.schema';
import { City } from 'src/city/schemas/city.schema';

export type CampaignDocument = Campaign & Document;

@Schema()
export class Campaign {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  from: Date;

  @Prop({ required: true })
  to: Date;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true, ref: Brand.name })
  brand: string;

  @Prop({ required: true, ref: City.name })
  cities: string[];

  @Prop({ required: true, default: Date.now() })
  createdAt: Date;
}

export const CampaignSchema = SchemaFactory.createForClass(Campaign);
