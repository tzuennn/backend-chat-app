import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile } from './schemas/profile.schema';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { calculateHoroscope } from './utils/horoscope.util';
import { calculateZodiac } from './utils/zodiac.util';

@Injectable()
export class ProfileService {
  constructor(@InjectModel(Profile.name) private profileModel: Model<Profile>) {}

  async createProfile(userId: string, createProfileDto: CreateProfileDto) {
    const { fullName, gender, dateOfBirth, locationOfBirth } = createProfileDto;
  
    const existingProfile = await this.profileModel.findOne({ userId }).exec();
    if (existingProfile) {
      throw new ConflictException('Profile already exists for this user');
    }
  
    const horoscope = calculateHoroscope(dateOfBirth);
    const zodiac = calculateZodiac(dateOfBirth);
  
    const profile = new this.profileModel({
      userId,
      fullName,
      gender,
      dateOfBirth,
      locationOfBirth,
      horoscope,
      zodiac,
    });
  
    return profile.save(); 
  }
  async getProfile(userId: string) {
    const profile = await this.profileModel.findOne({ userId });
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }
    return profile;
  }

  async updateProfile(userId: string, updateProfileDto: UpdateProfileDto) {
    const profile = await this.profileModel.findOne({ userId });
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }
  
    // Prepare updated fields
    const updatedFields = { ...updateProfileDto };
  
    // Recalculate zodiac and horoscope if dateOfBirth is updated
    if (updateProfileDto.dateOfBirth) {
      updatedFields.horoscope = calculateHoroscope(updateProfileDto.dateOfBirth);
      updatedFields.zodiac = calculateZodiac(updateProfileDto.dateOfBirth);
    }
  
    return this.profileModel.findOneAndUpdate(
      { userId },
      { $set: updatedFields },
      { new: true }, // Return updated document
    );
  }
}