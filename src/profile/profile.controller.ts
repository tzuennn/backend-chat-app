import { Controller, Patch, Post, Body, Get, Request, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { CreateProfileDto } from './dto/create-profile.dto';

@Controller('api')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(JwtAuthGuard)
  @Post('createProfile')
  async createProfile(
    @Request() req, // Extract the authenticated user
    @Body() createProfileDto: CreateProfileDto,
  ) {
    const userId = req.user.userId; // User ID from JWT
    return this.profileService.createProfile(userId, createProfileDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('getProfile')
  async getProfile(@Request() req) {
    const userId = req.user.userId; // Extracted from JWT payload
    return this.profileService.getProfile(userId);
  }
  
  @UseGuards(JwtAuthGuard)
  @Patch('updateProfile')
  async updateProfile(
    @Request() req,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    const userId = req.user.userId; // Extracted from JWT payload
    return this.profileService.updateProfile(userId, updateProfileDto);
  }

  
}

