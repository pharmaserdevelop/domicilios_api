import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusAddresses } from 'src/status-addresses/entities/status-addresses.entity';

import { Repository } from 'typeorm';

@Injectable()
export class StatusAddressesSeed {
  constructor(
    @InjectRepository(StatusAddresses)
    private readonly statusAddressesRepository: Repository<StatusAddresses>,
  ) {}

  async run() {
    await this.statusAddressesRepository.delete({});
    const status = [
      {
        state: 'entregado',
      },
      {
        state: 'en reparto',
      },
      {
        state: 'en devolucion',
      },
      {
        state: 'devolucion recibida',
      },
    ];

    await this.statusAddressesRepository.save(status);

    return {
      message:
        'Estados han sido eliminados y los nuevos estados han sido creados exitosamente',
    };
  }
}
