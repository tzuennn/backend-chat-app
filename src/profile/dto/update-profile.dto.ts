import { IsOptional, IsString, IsDateString } from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  @IsOptional()
  fullName?: string;

  @IsString()
  @IsOptional()
  gender?: string;

  @IsDateString()
  @IsOptional()
  dateOfBirth?: string;

  @IsString()
  @IsOptional()
  locationOfBirth?: string;

  // These are system-calculated fields
  @IsString()
  @IsOptional()
  zodiac?: string;

  @IsString()
  @IsOptional()
  horoscope?: string;
}