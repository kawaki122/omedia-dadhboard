import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Brand } from 'src/brand/schemas/brand.schema';

export type CampaignDocument = Campaign & Document;

@Schema()
export class Campaign {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, default: Date.now() })
  from: Date;

  @Prop({ required: true, default: Date.now() })
  to: Date;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true, ref: Brand.name })
  brand: string;

  @Prop({ required: true, default: Date.now() })
  createdAt: Date;
}

export const CampaignSchema = SchemaFactory.createForClass(Campaign);
