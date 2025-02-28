import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schema';

@Schema({ timestamps: true })
export class Pedal extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  type?: string; // e.g., Fuzz, Overdrive, Delay

  @Prop({ type: [String] }) // Only store knob names, no values
  knobs?: string[];

  @Prop({ required: true })
  createdById: string; // Always stored for filtering

  @Prop({ type: Types.ObjectId, ref: User.name })
  createdBy?: User; // Optional, can be populated
}

export const PedalSchema = SchemaFactory.createForClass(Pedal);
