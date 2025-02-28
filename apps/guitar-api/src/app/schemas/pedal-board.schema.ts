import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schema';

@Schema({ timestamps: true })
export class PedalBoard extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({
    type: [
      {
        pedalId: { type: String, required: true },
        order: { type: Number, required: true },
        knobValues: { type: Map, of: Number }, // Assign values here
      },
    ],
  })
  pedals: { pedalId: string; order: number; knobValues: Map<string, number> }[];

  @Prop({ required: true })
  createdById: string; // Always stored for filtering

  @Prop({ type: Types.ObjectId, ref: User.name })
  createdBy?: User; // Optional, can be populated
}

export const PedalBoardSchema = SchemaFactory.createForClass(PedalBoard);
