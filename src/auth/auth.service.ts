import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private jwtService: JwtService
    ){}

    async register(registerDto: RegisterDto) {
        const { email, username, password } = registerDto;
    
        const existingEmail = await this.userModel.findOne({ email });
        if (existingEmail) {
          throw new ConflictException('Email is already registered');
        }
    
        const existingUsername = await this.userModel.findOne({ username });
        if (existingUsername) {
          throw new ConflictException('Username is already taken');
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new this.userModel({ email, username, password: hashedPassword });
        const savedUser = await user.save();
    
        return {
          userId: savedUser._id,
          email: savedUser.email,
          username: savedUser.username,
        };
      }
      
    async login(identifier: string, password: string) {
        const user = await this.userModel.findOne({
            $or: [{ email: identifier }, { username: identifier }],
          });
      
          if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException('Invalid credentials');
          }
      
          const payload = { sub: user._id, email: user.email, username: user.username };
          const accessToken = this.jwtService.sign(payload);
      
          return { accessToken };
    }
}
