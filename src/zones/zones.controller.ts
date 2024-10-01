import { Controller, Post, Body } from '@nestjs/common';
import { ZonasService } from './zones.service';
import { CreateZoneDto } from './dto/create-zone.dto';

@Controller('zonas')
export class ZonasController {
  constructor(private readonly zonasService: ZonasService) {}

  @Post('create')
  create(@Body() createZonaDto: CreateZoneDto) {
    return this.zonasService.createZona(createZonaDto);
  }
}
