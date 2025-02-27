import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class PedalUsage extends Document {
  @Prop({ required: true })
  pedalId: string; // Reference to the pedal

  @Prop({ type: Map, of: Number }) // Actual values for this setup
  knobValues: Map<string, number>;
}

export const PedalUsageSchema = SchemaFactory.createForClass(PedalUsage);
