import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Amp } from './amp.schema';
import { PedalBoard } from './pedal-board.schema';
import { User } from './user.schema';
import { AmpUsage } from './amp-usage.schema';
import { Pedal } from './pedal.schema';

@Schema({ timestamps: true })
export class Pairing extends Document {
  @Prop({ type: String, required: false }) // ✅ Optional name
  name?: string;

  @Prop({ type: Types.ObjectId, ref: 'Amp', required: false }) // ✅ Optional amp link
  ampId?: string;
  amp?: Amp;

  @Prop({ type: Types.ObjectId, ref: PedalBoard.name, required: false }) // ✅ Optional pedalboard link
  pedalboardId?: string;
  pedalBoard?: PedalBoard;

  // ✅ Updated Pedal Array (Matches PedalEntry Interface)
  @Prop({
    type: [
      {
        pedalId: { type: Types.ObjectId, ref: 'Pedal', required: true },
        order: { type: Number, required: true },
        on: { type: Boolean, required: true, default: true }, // Default ON
        knobs: { type: Map, of: Number, default: {} }, // ✅ Uses "knobs" instead of "knobValues"
      },
    ],
  })
  pedals: {
    pedalId: Types.ObjectId;
    order: number;
    on: boolean;
    knobs: Map<string, number>;
    pedal?: Pedal; // ✅ Matches PairingPayload type
  }[];

  // ✅ New Control Values for Amp Settings
  @Prop({
    type: [
      {
        name: { type: String, required: true },
        type: { type: String, required: true },
        value: { type: Number, required: true },
      },
    ],
    default: [],
  })
  controlValues?: { name: string; type: string; value: number }[];

  @Prop({ required: true }) // ✅ Always required for ownership
  createdById: string;

  @Prop({ type: Types.ObjectId, ref: User.name }) // ✅ Optional user reference
  createdBy?: User;
}

export const PairingSchema = SchemaFactory.createForClass(Pairing);
