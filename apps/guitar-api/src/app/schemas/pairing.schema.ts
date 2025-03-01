import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Amp } from './amp.schema';
import { PedalBoard } from './pedal-board.schema';
import { User } from './user.schema';
import { AmpUsage } from './amp-usage.schema';

@Schema({ timestamps: true })
export class Pairing extends Document {
  @Prop({ type: Types.ObjectId, ref: 'AmpUsage', required: true }) // ✅ Link to AmpUsage
  ampUsageId: string;

  ampUsage?: AmpUsage;

  @Prop({ type: Types.ObjectId, ref: PedalBoard.name, required: true })
  pedalBoardId: string;

  pedalBoard?: PedalBoard;

  @Prop({ required: true })
  createdById: string;

  @Prop({ type: Types.ObjectId, ref: User.name })
  createdBy?: User;
}

export const PairingSchema = SchemaFactory.createForClass(Pairing);
