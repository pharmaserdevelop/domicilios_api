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

@Controller('state-history-debts')
export class StateHistoryDebtsController {
  constructor(
    private readonly stateHistoryDebtsService: StateHistoryDebtsService,
  ) {}

  @Post()
  create(@Body() createStateHistoryDebtDto: CreateStateHistoryDebtDto) {
    return this.stateHistoryDebtsService.createStateHistory(
      createStateHistoryDebtDto,
    );
  }

  @Get()
  findAll() {
    return this.stateHistoryDebtsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stateHistoryDebtsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStateHistoryDebtDto: UpdateStateHistoryDebtDto,
  ) {
    return this.stateHistoryDebtsService.update(+id, updateStateHistoryDebtDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stateHistoryDebtsService.remove(+id);
  }
}
