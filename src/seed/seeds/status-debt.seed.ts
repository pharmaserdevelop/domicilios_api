import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusDebt } from 'src/status-debts/entities/status-debt.entity';

import { Repository } from 'typeorm';

@Injectable()
export class statusDebtSeed {
  constructor(
    @InjectRepository(StatusDebt)
    private readonly statusDebtRepository: Repository<StatusDebt>,
  ) {}

  async run() {
    await this.statusDebtRepository.delete({});
    const status = [
      {
        state_debt: 'saldada',
      },
      {
        state_debt: 'rechazada',
      },
      {
        state_debt: 'aprobado',
      },
      {
        state_debt: 'pendiente',
      },
    ];

    await this.statusDebtRepository.save(status);

    return {
      message:
        'Los estados de la deuda han sido eliminados y los nuevos estados han sido creadas exitosamente',
    };
  }
}
