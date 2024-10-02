import { Injectable, NotFoundException } from '@nestjs/common';
import { StateHistory } from './entities/state_history.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Addresses } from 'src/addresses/entities/addresse.entity';

@Injectable()
export class StateHistoryService {
  constructor(
    @InjectRepository(StateHistory)
    private readonly stateHistoryRepository: Repository<StateHistory>,
    @InjectRepository(Addresses)
    private readonly addressesRepository: Repository<Addresses>,
  ) {}

  async findAll(): Promise<StateHistory[]> {
    return await this.stateHistoryRepository.find({
      relations: ['addresses', 'state'],
      order: {
        date: 'DESC',
      },
    });
  }

  async getStateHistoriesByAddressId(
    addressId: string,
  ): Promise<StateHistory[]> {
    const address = await this.addressesRepository.find({
      where: { id: addressId },
    });

    if (!address) {
      throw new NotFoundException(`Address with ID ${addressId} not found`);
    }

    return await this.stateHistoryRepository.find({
      where: { addresses: { id: addressId } },
      relations: ['addresses', 'state'],
      order: {
        date: 'DESC',
      },
    });
  }
}
