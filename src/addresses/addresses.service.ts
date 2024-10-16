import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateAddressesDto } from './dto/create-addresses.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Addresses } from './entities/addresse.entity';
import { Repository } from 'typeorm';
import { StatusAddresses } from 'src/status-addresses/entities/status-addresses.entity';
import { UpdateAddressesDto } from './dto/update-addresses.dto';
import { Zone } from 'src/zones/entities/zone.entity';
import { User } from 'src/users/entities/user.entity';
import { DebtsService } from 'src/debts/debts.service';
import { StateHistoryService } from 'src/state_history/state_history.service';
import { OriginService } from 'src/origin/origin.service';

@Injectable()
export class AddressessService {
  constructor(
    @InjectRepository(Addresses)
    private readonly addressesRepository: Repository<Addresses>,
    @InjectRepository(StatusAddresses)
    private readonly statusAddressesRepository: Repository<StatusAddresses>,
    private readonly stateHistoryService: StateHistoryService,
    @InjectRepository(Zone)
    private readonly zoneRepository,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly debtService: DebtsService,
    private readonly originService: OriginService,
  ) {}
  async create(createAddressesDto: CreateAddressesDto): Promise<Addresses> {
    const {
      state_name = 'en preparacion',
      zone_id,
      delivery_person_id,
      user_id,
      value,
      origin_id,
    } = createAddressesDto;

    try {
      const [state, zone, deliveryPerson, user, origin] = await Promise.all([
        this.statusAddressesRepository.findOne({
          where: { state: state_name },
        }),
        this.zoneRepository.findOne({ where: { id: zone_id } }),
        this.userRepository.findOne({ where: { id: delivery_person_id } }),
        this.userRepository.findOne({ where: { id: user_id } }),
        this.originService.findOne(origin_id),
      ]);

      if (!state)
        throw new NotFoundException(
          `State with name "${state_name}" not found`,
        );
      if (!zone)
        throw new NotFoundException(`Zone with id "${zone_id}" not found`);
      if (!deliveryPerson)
        throw new NotFoundException(
          `Delivery person with id "${delivery_person_id}" not found`,
        );
      if (!user)
        throw new NotFoundException(`User with id "${user_id}" not found`);
      if (!origin)
        throw new NotFoundException(`Origin with id "${origin_id}" not found`);

      const address = this.addressesRepository.create({
        ...createAddressesDto,
        zone,
        state,
        user,
        deliveryPerson,
        value: value,
        origin,
      });

      const savedAddress = await this.addressesRepository.save(address);

      await this.debtService.create({
        date: new Date(),
        amount: value,
        deliveryPersonId: delivery_person_id,
        addressId: savedAddress.id,
      });

      return savedAddress;
    } catch (error) {
      console.error('Error creating address:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'An error occurred while creating the address: ' + error.message,
      );
    }
  }

  findAll() {
    return this.addressesRepository.find({
      relations: ['user', 'state', 'deliveryPerson', 'deliveryReceivers'],
    });
  }

  async findOne(addresseId: string) {
    const addresses = this.findAddressById(addresseId);
    return addresses;
  }

  async updateAddressesState(
    addressesId: string,
    updateAddressesDto: UpdateAddressesDto,
  ): Promise<Addresses> {
    try {
      const addresses = await this.findAddressById(addressesId);
      const newState = await this.findStateByName(
        updateAddressesDto.state_name,
      );

      addresses.state = newState;
      await this.addressesRepository.save(addresses);

      await this.createStateHistoryEntry(addresses.id, newState.id);

      return addresses;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error  updated state of addresses',
        error,
      );
    }
  }

  private async findAddressById(addressesId: string): Promise<Addresses> {
    const addresses = await this.addressesRepository.findOne({
      where: { id: addressesId },
      relations: ['user', 'state', 'deliveryPerson', 'deliveryReceivers'],
    });

    if (!addresses) {
      throw new NotFoundException(`Addresses with ID ${addressesId} not found`);
    }

    return addresses;
  }

  private async findStateByName(stateName: string): Promise<StatusAddresses> {
    const state = await this.statusAddressesRepository.findOne({
      where: { state: stateName },
    });

    if (!state) {
      throw new NotFoundException(`State with name ${stateName} not found`);
    }

    return state;
  }

  private async createStateHistoryEntry(
    addressesId: string,
    stateId: string,
  ): Promise<void> {
    await this.stateHistoryService.createStateHistoryAddresses({
      addressesId,
      stateId,
    });
  }

  async updateSignature(addressId: string, filename: string) {
    const address = await this.addressesRepository.findOne({
      where: { id: addressId },
    });
    if (address) {
      address.signature = filename;
      await this.addressesRepository.save(address);
    } else {
      throw new Error('Address not found');
    }
  }
}
