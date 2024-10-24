import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Origin } from 'src/origin/entities/origin.entity';

import { Repository } from 'typeorm';

@Injectable()
export class OriginSeed {
  constructor(
    @InjectRepository(Origin)
    private readonly originRepository: Repository<Origin>,
  ) {}

  async run() {
    await this.originRepository.delete({});
    const origin = [
      {
        origin: 'KALAMARI',
      },
      {
        origin: 'MONTELIBANO',
      },
      {
        origin: 'EL CARMEN DE BOLIVAR',
      },
      {
        origin: 'PLANETA RICA',
      },
      {
        origin: 'CHIMA',
      },
    ];

    await this.originRepository.save(origin);

    return {
      message:
        'Los origenes han sido eliminados y los nuevos origenes han sido creadas exitosamente',
    };
  }
}
