import { Controller, Post, Body } from '@nestjs/common';
import { CreateStatusAddressesDto } from './dto/create-status-addresses.dto';
import { StatusAddressesService } from './status-addresses.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('status-addresses')
@Controller('status-addresses')
export class StatusAddressesController {
  constructor(
    private readonly estadosAddressessService: StatusAddressesService,
  ) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new status address' })
  @ApiResponse({
    status: 201,
    description: 'The status address has been successfully created.',
    type: CreateStatusAddressesDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Invalid status address data.',
  })
  createEsatodosAddressess(
    @Body() createEstadosAddressesDto: CreateStatusAddressesDto,
  ) {
    return this.estadosAddressessService.create(createEstadosAddressesDto);
  }
}
