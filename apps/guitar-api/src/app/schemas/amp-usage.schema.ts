import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schema';
import { Amp } from './amp.schema'; // Import Amp schema

@Schema({ timestamps: true })
export class AmpUsage extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: Amp.name, required: true }) // Store a reference, not just a string
  ampId: string;

  amp?: Amp;

  @Prop({ type: Map, of: String, default: {} })
  controlValues: Map<string, string>;

  @Prop({ required: true })
  createdById: string;

  @Prop({ type: Types.ObjectId, ref: User.name })
  createdBy?: User;
}

export const AmpUsageSchema = SchemaFactory.createForClass(AmpUsage);
