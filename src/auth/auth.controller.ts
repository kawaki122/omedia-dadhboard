import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/SignupDto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('signup')
  async signup(@Body() body: SignupDto) {
    return this.authService.signUp(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user_info')
  getUserInfo(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('updatePassword')
  updatePassword(@Request() req) {
    return this.authService.updatePassword({ ...req.body, ...req.user });
  }
}
