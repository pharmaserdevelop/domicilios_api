import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateZoneDto } from './dto/create-zone.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Zone } from './entities/zone.entity';
import { Repository } from 'typeorm';
import { ValidationService } from 'src/validation/validation.service';

@Injectable()
export class ZonesService {
  constructor(
    @InjectRepository(Zone)
    private readonly zoneRepository: Repository<Zone>,
    private readonly validationService: ValidationService,
  ) {}
  async createZone(createZoneDto: CreateZoneDto) {
    const { nameZone } = createZoneDto;

    const existingZone = await this.zoneRepository.findOne({
      where: { nameZone },
    });

    if (existingZone) {
      throw new BadRequestException(`The  zone with name "${nameZone}" exist.`);
    }
    const zone = this.zoneRepository.create(createZoneDto);
    try {
      await this.zoneRepository.save(zone);
      return { nameZone: zone.nameZone, id: zone.id };
    } catch (error) {
      this.validationService.handleDBrrors(error);
    }
  }

  async findOne(zonesId: string) {
    const addresses = this.findZonesById(zonesId);
    return addresses;
  }
  private async findZonesById(zonesId: string): Promise<Zone> {
    const zone = await this.zoneRepository.findOne({
      where: { id: zonesId },
    });

    if (!zone) {
      throw new NotFoundException(`Addresses with ID ${zonesId} not found`);
    }

    return zone;
  }

  findAll() {
    return this.zoneRepository.find();
  }
}
