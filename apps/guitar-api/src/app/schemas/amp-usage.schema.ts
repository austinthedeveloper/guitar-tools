import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class AmpUsage extends Document {
  @Prop({ required: true })
  ampId: string; // Reference to the amp

  @Prop({ type: Map, of: Number }) // Actual values for this setup
  knobValues: Map<string, number>;
}

export const AmpUsageSchema = SchemaFactory.createForClass(AmpUsage);
