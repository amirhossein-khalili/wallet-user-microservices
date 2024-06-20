import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  userName: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ enum: ['male', 'female', 'other'], default: 'other' })
  gender: string;

  @Prop({ default: false })
  softDelete: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
