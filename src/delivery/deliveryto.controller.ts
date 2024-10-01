import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RepartoService } from './delivery.service';
import { CreateDeliverytoDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';

@Controller('reparto')
export class RepartoController {
  constructor(private readonly repartoService: RepartoService) {}

  @Post()
  create(@Body() createRepartoDto: CreateDeliverytoDto) {
    return this.repartoService.create(createRepartoDto);
  }

  @Get()
  findAll() {
    return this.repartoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.repartoService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDeliveryDto: UpdateDeliveryDto,
  ) {
    return this.repartoService.update(+id, updateDeliveryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.repartoService.remove(+id);
  }
}
