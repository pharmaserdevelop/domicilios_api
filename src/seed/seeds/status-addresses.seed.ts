import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusAddresses } from 'src/status-addresses/entities/status-addresses.entity';

import { Repository } from 'typeorm';

@Injectable()
export class StatusAddressesSeed {
  constructor(
    @InjectRepository(StatusAddresses)
    private readonly estadoAddressesRepository: Repository<StatusAddresses>,
  ) {}

  async run() {
    await this.estadoAddressesRepository.delete({});
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

    await this.estadoAddressesRepository.save(status);

    return {
      message:
        'Estados han sido eliminados y los nuevos estados han sido creados exitosamente',
    };
  }
}
