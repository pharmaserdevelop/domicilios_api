import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressesDto } from './dto/create-addresses.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Addresses } from './entities/addresse.entity';
import { Repository } from 'typeorm';
import { StatusAddresses } from 'src/status-addresses/entities/status-addresses.entity';
import { UpdateAddressesDto } from './dto/update-addresses.dto';
import { StateHistory } from 'src/state_history/entities/state_history.entity';
import { Zone } from 'src/zones/entities/zone.entity';

@Injectable()
export class AddressessService {
  constructor(
    @InjectRepository(Addresses)
    private readonly addressesRepository: Repository<Addresses>,
    @InjectRepository(StatusAddresses)
    private readonly statusAddressesRepository: Repository<StatusAddresses>,
    @InjectRepository(StateHistory)
    private readonly stateHistoryRepository,
    @InjectRepository(Zone)
    private readonly zoneRepository,
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

    const zone = await this.zoneRepository.findOne({
      where: { id: createAddressesDto.zone_id },
    });

    if (!zone) {
      throw new NotFoundException(`Zone with id ${zone} not found`);
    }

    const address = this.addressesRepository.create({
      ...createAddressesDto,
      zone,
      state,
    });

    return await this.addressesRepository.save(address);
  }

  findAll() {
    return `This action returns all addresses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} addresses`;
  }

  async updateAddressesState(
    addressesId: string,
    updateAddressesDto: UpdateAddressesDto,
  ): Promise<Addresses> {
    const addresses = await this.addressesRepository.findOne({
      where: { id: addressesId },
      relations: ['state'],
    });

    if (!addresses) {
      throw new NotFoundException(`addresses con ID ${addressesId} no found`);
    }

    const newState = await this.statusAddressesRepository.findOne({
      where: { state: updateAddressesDto.state_name },
    });

    if (!newState) {
      throw new NotFoundException(
        `State with name ${updateAddressesDto.state_name} no found`,
      );
    }

    addresses.state = newState;
    await this.addressesRepository.save(addresses);

    const history = this.stateHistoryRepository.create({
      addresses: addresses,
      state: newState,
      date: new Date(),
    });

    await this.stateHistoryRepository.save(history);

    return addresses;
  }
}
