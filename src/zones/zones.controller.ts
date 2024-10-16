import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { ZonesService } from './zones.service';
import { CreateZoneDto } from './dto/create-zone.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('zones')
@Controller('zones')
export class ZonesController {
  constructor(private readonly zonesService: ZonesService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new zone' })
  @ApiResponse({
    status: 201,
    description: 'The zone has been successfully created.',
    type: CreateZoneDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request. Invalid zone data.' })
  create(@Body() createZoneDto: CreateZoneDto) {
    return this.zonesService.createZone(createZoneDto);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zonesService.findOne(id);
  }

  @Get()
  findAll() {
    return this.zonesService.findAll();
  }
}
