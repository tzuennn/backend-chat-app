import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Profile extends Document {
    @Prop({ required: true, unique: true })
    userId: string;

    @Prop({ required: true })
    fullName: string;

    @Prop({ required: true })
    gender: string; 
  
    @Prop({ required: true })
    dateOfBirth: string; 
  
    @Prop({ required: true })
    locationOfBirth: string;
  
    @Prop()
    zodiac: string; 
  
    @Prop()
    horoscope: string; 
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);