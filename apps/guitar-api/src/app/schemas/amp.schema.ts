import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schema';

@Schema({ timestamps: true })
export class Amp extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  brand: string;

  @Prop({ type: [String], default: ['Input 1'] }) // Multiple inputs supported
  inputs: string[];

  @Prop({ type: [String] }) // Store only knob names
  knobs: string[];

  @Prop({ required: true })
  createdById: string; // Always stored for filtering

  @Prop({ type: Types.ObjectId, ref: User.name })
  createdBy?: User; // Optional, can be populated
}

export const AmpSchema = SchemaFactory.createForClass(Amp);
