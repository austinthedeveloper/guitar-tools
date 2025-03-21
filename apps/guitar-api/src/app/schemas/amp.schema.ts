import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schema';

@Schema({ timestamps: true })
export class Amp extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  brand: string;

  @Prop({
    type: [
      {
        name: { type: String, required: true },
        type: {
          type: String,
          enum: ['input', 'knob', 'switch', 'selector'],
          required: true,
        },
        order: { type: Number, required: true },
        values: {
          type: [String],
          default: [],
        }, // Only for selectors
      },
    ],
    default: [],
  })
  controls: {
    name: string;
    type: 'input' | 'knob' | 'switch' | 'selector';
    order: number;
    values?: string[];
  }[];

  @Prop({ type: [String], default: ['Input 1'] }) // Multiple inputs supported
  inputs: string[];

  @Prop({
    type: [{ name: String, value: Number, order: Number }], // 👈 Added order
    default: [],
  })
  knobs: { name: string; value: number; order: number }[];

  @Prop({ required: true })
  createdById: string; // Always stored for filtering

  @Prop({ type: Types.ObjectId, ref: User.name })
  createdBy?: User; // Optional, can be populated
}

export const AmpSchema = SchemaFactory.createForClass(Amp).index(
  { name: 1, createdById: 1 },
  { unique: true }
);
