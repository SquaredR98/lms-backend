import { Controller, Post, Body, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }, @Req() req: Request) {
    const ip = req.ip;
    const userAgent = req.headers['user-agent'];
    return this.authService.login(body.email, body.password, ip, userAgent as string);
  }

  @Post('register')
  async register(@Body() body: { firstName: string; lastName: string; email: string; password: string }, @Req() req: Request) {
    const ip = req.ip;
    const userAgent = req.headers['user-agent'];
    return this.authService.register(body, ip, userAgent as string);
  }
} 