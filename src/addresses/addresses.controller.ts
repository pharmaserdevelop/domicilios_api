import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { CreateAddressesDto } from './dto/create-addresses.dto';
import { AddressessService } from './addresses.service';
import { UpdateAddressesDto } from './dto/update-addresses.dto';

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
    return this.addressesService.findOne(id);
  }

  @Put(':id/state')
  async updateState(
    @Param('id') id: string,
    @Body() updateAddressesDto: UpdateAddressesDto,
  ) {
    return await this.addressesService.updateAddressesState(
      id,
      updateAddressesDto,
    );
  }
}
