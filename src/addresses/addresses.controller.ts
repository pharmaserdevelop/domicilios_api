import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { CreateAddressesDto } from './dto/create-addresses.dto';
import { AddressessService } from './addresses.service';
import { UpdateAddressesDto } from './dto/update-addresses.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorater';

@ApiTags('addresses')
@Controller('addresses')
export class AddressessController {
  constructor(private readonly addressesService: AddressessService) {}

  @Auth()
  @Post('create')
  @ApiOperation({ summary: 'Create a new address' })
  @ApiResponse({
    status: 201,
    description: 'The address has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createAddressesDto: CreateAddressesDto) {
    return this.addressesService.create(createAddressesDto);
  }

  @Auth()
  @Get()
  @ApiOperation({ summary: 'Retrieve all addresses' })
  @ApiResponse({
    status: 200,
    description: 'List of all addresses.',
    type: [CreateAddressesDto],
  })
  findAll() {
    return this.addressesService.findAll();
  }


  @Auth()
  @Get(':id')
  @ApiOperation({ summary: 'Retrieve an address by ID' })
  @ApiResponse({
    status: 200,
    description: 'The found address.',
    type: CreateAddressesDto,
  })
  findOne(@Param('id') id: string) {
    return this.addressesService.findOne(id);
  }

  @Auth()
  @Put(':id/state')
  @ApiOperation({ summary: 'Update the state of an address' })
  @ApiResponse({
    status: 200,
    description: 'The state of the address has been successfully updated.',
    type: UpdateAddressesDto,
  })
  @ApiResponse({ status: 404, description: 'Address not found.' })
  async updateState(
    @Param('id') id: string,
    @Body() updateAddressesDto: UpdateAddressesDto,
  ) {
    return await this.addressesService.updateAddressesState(
      id,
      updateAddressesDto,
    );
  }

  @Auth()
  @Get('users/:userId/addresses')
  @ApiOperation({ summary: 'consult the addresses of a user.' })
  @ApiResponse({
    status: 200,
    description: 'The addresses of the user have been found.',
  })
  @ApiResponse({ status: 404, description: 'Address not found.' })
  async getUserAddresses(@Param('userId') userId: string) {
    return this.addressesService.findAddressesByUserId(userId);
  }
}
