import { Controller, Get, Param } from '@nestjs/common';
import { StateHistoryService } from './state_history.service';
import { StateHistory } from './entities/state_history.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('state-history')
@Controller('state-history')
export class StateHistoryController {
  constructor(private readonly stateHistoryService: StateHistoryService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve all state histories' })
  @ApiResponse({
    status: 200,
    description: 'List of all state histories.',
    type: [StateHistory],
  })
  findAll() {
    return this.stateHistoryService.findAll();
  }

  @Get('address/:id')
  @ApiOperation({ summary: 'Retrieve state histories by address ID' })
  @ApiResponse({
    status: 200,
    description: 'The found state histories for the given address ID.',
    type: [StateHistory],
  })
  @ApiResponse({
    status: 404,
    description: 'No state histories found for the provided address ID.',
  })
  async getHistoriesByAddressId(
    @Param('id') id: string,
  ): Promise<StateHistory[]> {
    return await this.stateHistoryService.getStateHistoriesByAddressId(id);
  }
}
