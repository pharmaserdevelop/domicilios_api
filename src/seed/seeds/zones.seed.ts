import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Zone } from 'src/zones/entities/zone.entity';

import { Repository } from 'typeorm';

@Injectable()
export class ZonesSeed {
  constructor(
    @InjectRepository(Zone)
    private readonly zoneRepository: Repository<Zone>,
  ) {}

  async run() {
    await this.zoneRepository.delete({});
    const status = [
      {
        nameZone: 'monpox',
      },
      {
        nameZone: 'tierra alta',
      },
      {
        nameZone: 'cordoba',
      },
      {
        nameZone: 'cartagena',
      },
      {
        nameZone: 'turbaco',
      },
    ];

    await this.zoneRepository.save(status);

    return {
      message:
        'Las zonas han sido eliminados y las nuevas zonas han sido creadas exitosamente',
    };
  }
}
