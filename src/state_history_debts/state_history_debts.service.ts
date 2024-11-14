import { Injectable } from '@nestjs/common';
import { UpdateStateHistoryDebtDto } from './dto/update-state_history_debt.dto';
import { StateHistoryDebt } from './entities/state_history_debt.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Debt } from 'src/debts/entities/debt.entity';
import { CreateStateHistoryDebtDto } from './dto/create-state_history_debt.dto';

@Injectable()
export class StateHistoryDebtsService {
  constructor(
    @InjectRepository(StateHistoryDebt)
    private readonly stateHistoryDebtRepository: Repository<StateHistoryDebt>,
    @InjectRepository(Debt)
    private readonly debtRepository: Repository<Debt>,
  ) {}

  async createStateHistory(
    createStateHistoryDebtDto: CreateStateHistoryDebtDto,
  ) {
    const { debtId, stateDebt } = createStateHistoryDebtDto;

    const history = this.stateHistoryDebtRepository.create({
      debt: { id: debtId },
      state_debt: { id: stateDebt },
      date: new Date(),
    });

    return await this.stateHistoryDebtRepository.save(history);
  }

  async findAll(): Promise<StateHistoryDebt[]> {
    return await this.stateHistoryDebtRepository.find({
      relations: ['debt', 'state_debt'],
      order: {
        date: 'DESC',
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} stateHistoryDebt`;
  }

  update(id: number, updateStateHistoryDebtDto: UpdateStateHistoryDebtDto) {
    return `This action updates a #${id} ${updateStateHistoryDebtDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} stateHistoryDebt`;
  }
}
