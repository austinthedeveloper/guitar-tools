import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Knob extends Document {
  @Prop({ required: true, unique: true })
  name: string;
}

export const KnobSchema = SchemaFactory.createForClass(Knob);
