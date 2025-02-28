import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  googleId: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  displayName: string;

  @Prop()
  photoUrl: string;

  @Prop()
  refreshToken?: string; // Optional for refresh token support
}

export const UserSchema = SchemaFactory.createForClass(User);
