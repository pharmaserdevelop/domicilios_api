import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateZoneDto } from './dto/create-zone.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Zona } from './entities/zone.entity';
import { Repository } from 'typeorm';
import { ValidationService } from 'src/validation/validation.service';

@Injectable()
export class ZonasService {
  constructor(
    @InjectRepository(Zona)
    private readonly zonaRepository: Repository<Zona>,
    private readonly validationService: ValidationService,
  ) {}
  async createZona(createZoneDto: CreateZoneDto) {
    const { nameZone } = createZoneDto;

    const existingZona = await this.zonaRepository.findOne({
      where: { nameZone },
    });

    if (existingZona) {
      throw new BadRequestException(
        `La zona con el nombre "${nameZone}" ya existe.`,
      );
    }
    const zona = this.zonaRepository.create(createZoneDto);
    try {
      await this.zonaRepository.save(zona);
      return { nameZone: zona.nameZone, id: zona.id };
    } catch (error) {
      this.validationService.handleDBrrors(error);
    }
  }
}
