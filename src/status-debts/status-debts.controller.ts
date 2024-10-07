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

@Controller('status-debts')
export class StatusDebtsController {
  constructor(private readonly statusDebtsService: StatusDebtsService) {}

  @Post()
  create(@Body() createStatusDebtDto: CreateStatusDebtDto) {
    return this.statusDebtsService.create(createStatusDebtDto);
  }

  @Get()
  findAll() {
    return this.statusDebtsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statusDebtsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStatusDebtDto: UpdateStatusDebtDto,
  ) {
    return this.statusDebtsService.update(+id, updateStatusDebtDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statusDebtsService.remove(+id);
  }
}
