import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressesDto } from './dto/create-addresses.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Addresses } from './entities/addresse.entity';
import { Repository } from 'typeorm';
import { StatusAddresses } from 'src/status-addresses/entities/status-addresses.entity';

@Injectable()
export class AddressessService {
  constructor(
    @InjectRepository(Addresses)
    private readonly addressesRepository: Repository<Addresses>,
    @InjectRepository(StatusAddresses)
    private readonly statusAddressesRepository: Repository<StatusAddresses>,
  ) {}
  async create(createAddressesDto: CreateAddressesDto): Promise<Addresses> {
    const state = await this.statusAddressesRepository.findOne({
      where: { state: createAddressesDto.state_name },
    });

    if (!state) {
      throw new NotFoundException(
        `State with name ${createAddressesDto.state_name} not found`,
      );
    }
    const address = this.addressesRepository.create({
      ...createAddressesDto,
      state,
    });

    return await this.addressesRepository.save(address);
  }

  findAll() {
    return `This action returns all addresses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} domicilio`;
  }
}
