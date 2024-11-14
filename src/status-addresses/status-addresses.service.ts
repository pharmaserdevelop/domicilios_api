import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStatusAddressesDto } from './dto/create-status-addresses.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusAddresses } from './entities/status-addresses.entity';
import { Repository } from 'typeorm';
import { ValidationService } from 'src/validation/validation.service';

@Injectable()
export class StatusAddressesService {
  constructor(
    @InjectRepository(StatusAddresses)
    private readonly statusAddressesRepository: Repository<StatusAddresses>,
    private readonly validationRepository: ValidationService,
  ) {}
  async create(createEstadosAddressesDto: CreateStatusAddressesDto) {
    const { state } = createEstadosAddressesDto;

    const existingEstado = await this.statusAddressesRepository.findOne({
      where: { state },
    });

    if (existingEstado) {
      throw new BadRequestException('el estado ya existe');
    }
    const estadoAddresses = this.statusAddressesRepository.create(
      createEstadosAddressesDto,
    );

    try {
      await this.statusAddressesRepository.save(estadoAddresses);
      return { estado: estadoAddresses.state, id: estadoAddresses.id };
    } catch (error) {
      this.validationRepository.handleDBrrors(error);
    }
    return 'This action adds a new estadosAddresses';
  }
}
