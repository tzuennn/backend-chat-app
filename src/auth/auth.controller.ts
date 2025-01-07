import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('api')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body() RegisterDto: RegisterDto) {
        return this.authService.register(RegisterDto.email, RegisterDto.password);
    }

    @Post('login')
    async login(@Body() LoginDto: LoginDto) {
        return this.authService.login(LoginDto.email, LoginDto.password);
    }
}
