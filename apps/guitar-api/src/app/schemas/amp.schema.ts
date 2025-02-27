import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Amp extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [String], default: ['Input 1'] }) // Multiple inputs supported
  inputs: string[];

  @Prop({ type: [String] }) // Store only knob names
  knobs: string[];
}

export const AmpSchema = SchemaFactory.createForClass(Amp);
