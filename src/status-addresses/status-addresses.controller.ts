import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateStatusAddressesDto } from './dto/create-status-addresses.dto';
import { UpdateStatusAddressesDto } from './dto/update-status-addresses.dto';
import { StatusAddressesService } from './status-addresses.service';

@Controller('estados-addresses')
export class StatusAddressesController {
  constructor(private readonly estadosAddressessService: StatusAddressesService) {}

  @Post('create')
  createEsatodosAddressess(@Body() createEstadosAddressesDto: CreateStatusAddressesDto) {
    return this.estadosAddressessService.create(createEstadosAddressesDto);
  }

  @Get()
  findAll() {
    return this.estadosAddressessService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estadosAddressessService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEstadosAddressesDto: UpdateStatusAddressesDto) {
    return this.estadosAddressessService.update(+id, updateEstadosAddressesDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estadosAddressessService.remove(+id);
  }
}
