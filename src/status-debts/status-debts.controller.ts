import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StatusDebtsService } from './status-debts.service';
import { CreateStatusDebtDto } from './dto/create-status-debt.dto';
import { UpdateStatusDebtDto } from './dto/update-status-debt.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('status-debts')
@Controller('status-debts')
export class StatusDebtsController {
  constructor(private readonly statusDebtsService: StatusDebtsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new status debt' })
  @ApiResponse({
    status: 201,
    description: 'The status debt has been successfully created.',
    type: CreateStatusDebtDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Invalid status debt data.',
  })
  create(@Body() createStatusDebtDto: CreateStatusDebtDto) {
    return this.statusDebtsService.create(createStatusDebtDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all status debts' })
  @ApiResponse({
    status: 200,
    description: 'List of all status debts.',
    type: [CreateStatusDebtDto],
  })
  findAll() {
    return this.statusDebtsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a status debt by ID' })
  @ApiResponse({
    status: 200,
    description: 'The found status debt.',
    type: CreateStatusDebtDto,
  })
  @ApiResponse({ status: 404, description: 'Status debt not found.' })
  findOne(@Param('id') id: string) {
    return this.statusDebtsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a status debt by ID' })
  @ApiResponse({
    status: 200,
    description: 'The status debt has been successfully updated.',
    type: UpdateStatusDebtDto,
  })
  @ApiResponse({ status: 404, description: 'Status debt not found.' })
  update(
    @Param('id') id: string,
    @Body() updateStatusDebtDto: UpdateStatusDebtDto,
  ) {
    return this.statusDebtsService.update(+id, updateStatusDebtDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a status debt by ID' })
  @ApiResponse({
    status: 204,
    description: 'The status debt has been successfully removed.',
  })
  @ApiResponse({ status: 404, description: 'Status debt not found.' })
  remove(@Param('id') id: string) {
    return this.statusDebtsService.remove(+id);
  }
}
