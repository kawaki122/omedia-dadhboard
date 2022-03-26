import { Body, Controller, Patch, Post } from '@nestjs/common';
import { LocationDto } from '../dto/location.dto';
import { LocationService } from '../services/location.service';
import { LocationUpdateDto } from '../dto/location.update.dto';

@Controller('location')
export class LocationController {
    constructor(
        private readonly locationService: LocationService
    ) { }

    @Patch()
    addLocation(@Body() body: LocationDto) {
        return this.locationService.upsertLocation(body);
    }
    @Post("save")
    updateLocation(@Body() body: LocationUpdateDto) {
        this.locationService.saveLocationChanges(body)
    }
}
