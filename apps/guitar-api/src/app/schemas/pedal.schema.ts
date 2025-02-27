import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Pedal extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  type?: string; // e.g., Fuzz, Overdrive, Delay

  @Prop({ type: [String] }) // Only store knob names, no values
  knobs?: string[];
}

export const PedalSchema = SchemaFactory.createForClass(Pedal);
