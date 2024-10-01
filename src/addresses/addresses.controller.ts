import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CreateAddressesDto } from './dto/create-addresses.dto';
import { AddressessService } from './addresses.service';

@Controller('addresses')
export class AddressessController {
  constructor(private readonly addressesService: AddressessService) {}

  @Post('create')
  create(@Body() createAddressesDto: CreateAddressesDto) {
    return this.addressesService.create(createAddressesDto);
  }

  @Get()
  findAll() {
    return this.addressesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.addressesService.findOne(+id);
  }
}
