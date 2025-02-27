import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
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
}

export const PedalBoardSchema = SchemaFactory.createForClass(PedalBoard);
