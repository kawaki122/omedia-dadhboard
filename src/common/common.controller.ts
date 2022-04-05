import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CommonService } from './common.service';

@Controller('common')
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

  @UseGuards(JwtAuthGuard)
  @Get('getInitial')
  getInitial(@Request() req) {
    return this.commonService.getInitial(req.user);
  }
}
