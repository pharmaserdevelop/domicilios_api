import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DebtsService } from './debts.service';
import { CreateDebtDto } from './dto/create-debt.dto';
import { UpdateDebtDto } from './dto/update-debt.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('debts')
@Controller('debts')
export class DebtsController {
  constructor(private readonly debtsService: DebtsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new debt' })
  @ApiResponse({
    status: 201,
    description: 'The debt has been successfully created.',
    type: CreateDebtDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request. Invalid debt data.' })
  create(@Body() createDebtDto: CreateDebtDto) {
    return this.debtsService.create(createDebtDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all debts' })
  @ApiResponse({
    status: 200,
    description: 'List of all debts.',
    type: [CreateDebtDto],
  })
  findAll() {
    return this.debtsService.findAllDebts();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a debt by ID' })
  @ApiResponse({
    status: 200,
    description: 'The found debt.',
    type: CreateDebtDto,
  })
  @ApiResponse({ status: 404, description: 'Debt not found.' })
  findOne(@Param('id') id: string) {
    return this.debtsService.findDebtById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update the state of a debt' })
  @ApiResponse({
    status: 200,
    description: 'The state of the debt has been successfully updated.',
    type: UpdateDebtDto,
  })
  @ApiResponse({ status: 404, description: 'Debt not found.' })
  update(@Param('id') id: string, @Body() updateDebtDto: UpdateDebtDto) {
    return this.debtsService.updateDebtsState(id, updateDebtDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a debt by ID' })
  @ApiResponse({
    status: 204,
    description: 'The debt has been successfully removed.',
  })
  @ApiResponse({ status: 404, description: 'Debt not found.' })
  remove(@Param('id') id: string) {
    return this.debtsService.remove(+id);
  }
}
