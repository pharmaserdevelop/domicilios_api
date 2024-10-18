import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateDebtDto } from './dto/create-debt.dto';
import { UpdateDebtDto } from './dto/update-debt.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Debt } from './entities/debt.entity';
import { Repository } from 'typeorm';
import { Addresses } from 'src/addresses/entities/addresse.entity';
import { StatusDebt } from 'src/status-debts/entities/status-debt.entity';
import { User } from 'src/users/entities/user.entity';
import { StateHistoryDebtsService } from 'src/state_history_debts/state_history_debts.service';

@Injectable()
export class DebtsService {
  constructor(
    @InjectRepository(Debt)
    private readonly debtRepository: Repository<Debt>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Addresses)
    private addressesRepository: Repository<Addresses>,
    @InjectRepository(StatusDebt)
    private statusDebtRepository: Repository<StatusDebt>,
    private readonly stateHistoryDebtService: StateHistoryDebtsService,
  ) {}
  async create(createDebtDto: CreateDebtDto): Promise<Debt> {
    const { deliveryPersonId, state_debt, addressId, amount } = createDebtDto;

    const deliveryPerson = await this.userRepository.findOne({
      where: { id: deliveryPersonId },
    });
    const address = await this.addressesRepository.findOne({
      where: { id: addressId },
    });
    const stateDebt = await this.statusDebtRepository.findOne({
      where: { state_debt: state_debt },
    });

    if (!deliveryPerson)
      throw new NotFoundException(
        `Delivery person with id "${deliveryPersonId}" not found`,
      );
    if (!address)
      throw new NotFoundException(`Address with id "${addressId}" not found`);
    if (!stateDebt)
      throw new NotFoundException(
        `State debt with id "${stateDebt}" not found`,
      );

    const debt = this.debtRepository.create({
      date: new Date(),
      amount,
      deliveryPerson,
      address,
      state_debt: stateDebt,
    });

    return await this.debtRepository.save(debt);
  }

  async findAllDebts(): Promise<Debt[]> {
    try {
      return await this.fetchAllDebts();
    } catch (error) {
      this.handleError(error);
    }
  }

  private async fetchAllDebts(): Promise<Debt[]> {
    return await this.debtRepository.find({
      relations: ['address', 'state_debt'],
    });
  }

  async findDebtById(debtId: string): Promise<Debt> {
    try {
      const debt = await this.fetchDebtWithRelations(debtId);

      if (!debt) {
        this.handleNotFound(debtId);
      }

      return debt;
    } catch (error) {
      this.handleError(error);
    }
  }

  private async fetchDebtWithRelations(debtId: string): Promise<Debt | null> {
    return await this.debtRepository.findOne({
      where: { id: debtId },
      relations: ['address'],
    });
  }

  private handleNotFound(debtId: string): void {
    throw new NotFoundException(`Debt with id "${debtId}" not found`);
  }

  private handleError(error: any): void {
    console.error('Error finding debt:', error);

    if (error instanceof NotFoundException) {
      throw error;
    }

    throw new InternalServerErrorException(
      'An error occurred while retrieving the debt',
    );
  }

  async updateDebtsState(debtId: string, updateDebtDto: UpdateDebtDto) {
    try {
      const debt = await this.findDebtById(debtId);

      const newState = await this.findStateDebtByName(updateDebtDto.state_debt);

      debt.state_debt = newState;
      await this.debtRepository.save(debt);

      await this.stateHistoryDebtService.createStateHistory({
        debtId: debt.id,
        stateDebt: newState.id,
      });

      return debt;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error updated state of debt',
        error,
      );
    }
  }

  private async findStateDebtByName(stateDebt: string): Promise<StatusDebt> {
    const newState = await this.statusDebtRepository.findOne({
      where: { state_debt: stateDebt },
    });

    if (!newState) {
      throw new NotFoundException(`State with name ${stateDebt} no found`);
    }

    return newState;
  }

  remove(id: number) {
    return `This action removes a #${id} deuda`;
  }
}
