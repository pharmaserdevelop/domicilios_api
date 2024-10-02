import { Controller, Get, Param } from '@nestjs/common';
import { StateHistoryService } from './state_history.service';
import { StateHistory } from './entities/state_history.entity';

@Controller('state-history')
export class StateHistoryController {
  constructor(private readonly stateHistoryService: StateHistoryService) {}

  @Get()
  findAll() {
    return this.stateHistoryService.findAll();
  }

  @Get('address/:id')
  async getHistoriesByAddressId(
    @Param('id') id: string,
  ): Promise<StateHistory[]> {
    return await this.stateHistoryService.getStateHistoriesByAddressId(id);
  }
}
