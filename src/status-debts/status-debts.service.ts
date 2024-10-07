import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStatusDebtDto } from './dto/create-status-debt.dto';
import { UpdateStatusDebtDto } from './dto/update-status-debt.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ValidationService } from 'src/validation/validation.service';
import { Repository } from 'typeorm';
import { StatusDebt } from './entities/status-debt.entity';

@Injectable()
export class StatusDebtsService {
  constructor(
    @InjectRepository(StatusDebt)
    private readonly statusDebtRepository: Repository<StatusDebt>,
    private readonly validationRepository: ValidationService,
  ) {}
  async create(createStatusDebtDto: CreateStatusDebtDto) {
    const { state_debt } = createStatusDebtDto;

    const existingState = await this.statusDebtRepository.findOne({
      where: { state_debt },
    });

    if (existingState) {
      throw new BadRequestException('the state exist');
    }
    const statusDebts = this.statusDebtRepository.create(createStatusDebtDto);

    try {
      await this.statusDebtRepository.save(statusDebts);
      return { state_debt: statusDebts.state_debt, id: statusDebts.id };
    } catch (error) {
      this.validationRepository.handleDBrrors(error);
    }
    return 'This action adds a new status debts';
  }

  findAll() {
    return `This action returns all statusDebts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} statusDebt`;
  }

  update(id: number, updateStatusDebtDto: UpdateStatusDebtDto) {
    return `This action updates a #${id} ${updateStatusDebtDto} statusDebt`;
  }

  remove(id: number) {
    return `This action removes a #${id} statusDebt`;
  }
}
