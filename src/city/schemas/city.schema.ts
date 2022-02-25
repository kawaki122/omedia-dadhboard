import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CityDocument = City & Document;

@Schema()
export class City {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, default: Date.now() })
  createdAt: Date;
}

export const CitySchema = SchemaFactory.createForClass(City);
