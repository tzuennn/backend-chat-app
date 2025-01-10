import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Match } from '../validators/match.decorator'; // Import custom validator

export class RegisterDto {
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;

  @IsNotEmpty({ message: 'Username is required' })
  @MinLength(4, { message: 'Username must be at least 4 characters long' })
  username: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @IsNotEmpty({ message: 'Confirm password is required' })
  @Match('password', { message: 'Confirm password does not match the password' })
  confirmPassword: string;
}