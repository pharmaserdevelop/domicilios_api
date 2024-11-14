import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OriginService } from './origin.service';
import { CreateOriginDto } from './dto/create-origin.dto';
import { UpdateOriginDto } from './dto/update-origin.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorater';

@ApiTags('origin')
@Controller('origin')
export class OriginController {
  constructor(private readonly originService: OriginService) {}

  @Auth()
  @Post()
  @ApiOperation({ summary: 'Create a new origin' })
  @ApiResponse({
    status: 201,
    description: 'The origin has been successfully created.',
    type: CreateOriginDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Invalid origin data.',
  })
  create(@Body() createOriginDto: CreateOriginDto) {
    return this.originService.create(createOriginDto);
  }

  @Auth()
  @Get()
  @ApiOperation({ summary: 'Retrieve all origins' })
  @ApiResponse({
    status: 200,
    description: 'List of all origins.',
    type: [CreateOriginDto],
  })
  findAll() {
    return this.originService.findAll();
  }

  @Auth()
  @Get(':id')
  @ApiOperation({ summary: 'Retrieve an origin by ID' })
  @ApiResponse({
    status: 200,
    description: 'The found origin.',
    type: CreateOriginDto,
  })
  @ApiResponse({ status: 404, description: 'Origin not found.' })
  findOne(@Param('id') id: string) {
    return this.originService.findOne(id);
  }

  @Auth()
  @Patch(':id')
  @ApiOperation({ summary: 'Update an origin by ID' })
  @ApiResponse({
    status: 200,
    description: 'The origin has been successfully updated.',
    type: UpdateOriginDto,
  })
  @ApiResponse({ status: 404, description: 'Origin not found.' })
  update(@Param('id') id: string, @Body() updateOriginDto: UpdateOriginDto) {
    return this.originService.update(id, updateOriginDto);
  }

  @Auth()
  @Delete(':id')
  @ApiOperation({ summary: 'Remove an origin by ID' })
  @ApiResponse({
    status: 204,
    description: 'The origin has been successfully removed.',
  })
  @ApiResponse({ status: 404, description: 'Origin not found.' })
  remove(@Param('id') id: string) {
    return this.originService.remove(id);
  }
}
