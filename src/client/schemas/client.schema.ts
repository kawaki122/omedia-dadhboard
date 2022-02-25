import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ClientDocument = Client & Document;

@Schema()
export class Client {
  @Prop({ required: true })
  name: string;

  @Prop()
  img: string;

  @Prop({ required: true, default: Date.now() })
  createdAt: Date;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
