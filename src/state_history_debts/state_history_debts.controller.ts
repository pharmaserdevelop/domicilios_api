import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StateHistoryDebtsService } from './state_history_debts.service';
import { CreateStateHistoryDebtDto } from './dto/create-state_history_debt.dto';
import { UpdateStateHistoryDebtDto } from './dto/update-state_history_debt.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('state-history-debts')
@Controller('state-history-debts')
export class StateHistoryDebtsController {
  constructor(
    private readonly stateHistoryDebtsService: StateHistoryDebtsService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new state history debt' })
  @ApiResponse({
    status: 201,
    description: 'The state history debt has been successfully created.',
    type: CreateStateHistoryDebtDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Invalid state history debt data.',
  })
  create(@Body() createStateHistoryDebtDto: CreateStateHistoryDebtDto) {
    return this.stateHistoryDebtsService.createStateHistory(
      createStateHistoryDebtDto,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all state history debts' })
  @ApiResponse({
    status: 200,
    description: 'List of all state history debts.',
    type: [CreateStateHistoryDebtDto],
  })
  findAll() {
    return this.stateHistoryDebtsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a state history debt by ID' })
  @ApiResponse({
    status: 200,
    description: 'The found state history debt.',
    type: CreateStateHistoryDebtDto,
  })
  @ApiResponse({ status: 404, description: 'State history debt not found.' })
  findOne(@Param('id') id: string) {
    return this.stateHistoryDebtsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a state history debt by ID' })
  @ApiResponse({
    status: 200,
    description: 'The state history debt has been successfully updated.',
    type: UpdateStateHistoryDebtDto,
  })
  @ApiResponse({ status: 404, description: 'State history debt not found.' })
  update(
    @Param('id') id: string,
    @Body() updateStateHistoryDebtDto: UpdateStateHistoryDebtDto,
  ) {
    return this.stateHistoryDebtsService.update(+id, updateStateHistoryDebtDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a state history debt by ID' })
  @ApiResponse({
    status: 204,
    description: 'The state history debt has been successfully removed.',
  })
  @ApiResponse({ status: 404, description: 'State history debt not found.' })
  remove(@Param('id') id: string) {
    return this.stateHistoryDebtsService.remove(+id);
  }
}
