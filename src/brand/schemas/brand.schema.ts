import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Client } from 'src/client/schemas/client.schema';

export type BrandDocument = Brand & Document;

@Schema()
export class Brand {
  @Prop({ required: true })
  title: string;

  @Prop()
  img: string;

  @Prop({ required: true, ref: Client.name })
  client: string;

  @Prop({ required: true, default: Date.now() })
  createdAt: Date;
}

export const BrandSchema = SchemaFactory.createForClass(Brand);
