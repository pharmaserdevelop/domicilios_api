import { Controller, Post, Body } from '@nestjs/common';
import { CreateStatusAddressesDto } from './dto/create-status-addresses.dto';
import { StatusAddressesService } from './status-addresses.service';

@Controller('estados-addresses')
export class StatusAddressesController {
  constructor(
    private readonly estadosAddressessService: StatusAddressesService,
  ) {}

  @Post('create')
  createEsatodosAddressess(
    @Body() createEstadosAddressesDto: CreateStatusAddressesDto,
  ) {
    return this.estadosAddressessService.create(createEstadosAddressesDto);
  }
}
