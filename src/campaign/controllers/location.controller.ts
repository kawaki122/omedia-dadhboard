import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LocationDto } from '../dto/location.dto';
import { LocationService } from '../services/location.service';
import { LocationUpdateDto } from '../dto/location.update.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get('getClientLocations')
  getClientLocations(@Request() req) {
    return this.locationService.getClientLocations('6223771f4b78b76e16690b2f');
  }

  @Patch()
  addLocation(@Body() body: LocationDto) {
    return this.locationService.upsertLocation(body);
  }
  @Post('save')
  updateLocation(@Body() body: LocationUpdateDto) {
    this.locationService.saveLocationChanges(body);
  }
}
