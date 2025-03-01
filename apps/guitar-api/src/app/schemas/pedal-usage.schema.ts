import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schema';

@Schema({ timestamps: true })
export class PedalUsage extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  pedalId: string; // Reference to the pedal

  @Prop({ type: Map, of: Number }) // Actual values for this setup
  knobValues: Map<string, number>;

  @Prop({ required: true })
  createdById: string; // Always stored for filtering

  @Prop({ type: Types.ObjectId, ref: User.name })
  createdBy?: User; // Optional, can be populated
}

export const PedalUsageSchema = SchemaFactory.createForClass(PedalUsage);
