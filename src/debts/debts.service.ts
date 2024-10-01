import { Injectable } from '@nestjs/common';
import { CreateDebtDto } from './dto/create-debt.dto';
import { UpdateDebtDto } from './dto/update-debt.dto';

@Injectable()
export class DebtsService {
  create(createDebtDto: CreateDebtDto) {
    return 'This action adds a new deuda';
  }

  findAll() {
    return `This action returns all debts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} deuda`;
  }

  update(id: number, updateDebtDto: UpdateDebtDto) {
    return `This action updates a #${id} deuda`;
  }

  remove(id: number) {
    return `This action removes a #${id} deuda`;
  }
}
