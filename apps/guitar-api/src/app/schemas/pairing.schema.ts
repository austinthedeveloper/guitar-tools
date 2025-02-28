import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Amp } from './amp.schema';
import { PedalBoard } from './pedal-board.schema';
import { User } from './user.schema';

@Schema({ timestamps: true })
export class Pairing extends Document {
  @Prop({ type: Types.ObjectId, ref: Amp.name, required: true })
  ampId: Amp;

  @Prop({ type: Types.ObjectId, ref: PedalBoard.name, required: true })
  pedalBoardId: PedalBoard;

  @Prop({ required: true })
  createdById: string;

  @Prop({ type: Types.ObjectId, ref: User.name })
  createdBy?: User;
}

export const PairingSchema = SchemaFactory.createForClass(Pairing);
