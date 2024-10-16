import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Addresses } from './entities/addresse.entity';
import { StatusAddresses } from 'src/status-addresses/entities/status-addresses.entity';
import { Zone } from 'src/zones/entities/zone.entity';
import { User } from 'src/users/entities/user.entity';
import { DebtsService } from 'src/debts/debts.service';
import { StateHistoryService } from 'src/state_history/state_history.service';
import { OriginService } from 'src/origin/origin.service'; 
import {
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { AddressessService } from './addresses.service';

describe('AddressessService', () => {
  let service: AddressessService;
  let addressesRepository;
  let statusAddressesRepository;
  let zoneRepository;
  let userRepository;
  let debtService;
  let stateHistoryService;
  let originService;

  const mockAddress = {
    id: '1',
    state: {},
    zone: {},
    deliveryPerson: {},
    user: {},
    value: 100,
    origin: 'Some Origin',
    mutualAgreement: false,
    affiliateDocument: '0',
    affiliateName: '0',
    affiliatePhone: '0',
    addresses: '123 Main St',
    date: new Date(),
    imageUrl: '0',
    signature: '0',
    finishedState: false,
    deliveryReceivers: [],
    origin_id: 'origin-id'
  };

  const mockCreateAddressesDto = {
    state_name: 'en preparacion',
    zone_id: '1',
    delivery_person_id: '1',
    user_id: '1',
    value: 100,
    origin_id: 'origin-id', 
    origin: 'Some Origin',
    mutual_agreement: false,
    affiliateDocument: '0',
    affiliateName: '0',
    affiliatePhone: '0',
    addresses: '123 Main St'
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressessService,
        {
          provide: getRepositoryToken(Addresses),
          useValue: {
            create: jest.fn().mockReturnValue(mockAddress),
            save: jest.fn().mockResolvedValue(mockAddress),
          },
        },
        {
          provide: getRepositoryToken(StatusAddresses),
          useValue: {
            findOne: jest.fn().mockImplementation((options) => {
              if (options.where.state === 'en preparacion') {
                return Promise.resolve({
                  id: 'state-id',
                  state: 'en preparacion',
                });
              }
              return Promise.resolve(null);
            }),
          },
        },
        {
          provide: getRepositoryToken(Zone),
          useValue: {
            findOne: jest.fn().mockResolvedValue({ id: 'zone-id' }),
          },
        },
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn().mockImplementation((options) => {
              if (
                options.where.id === mockCreateAddressesDto.delivery_person_id
              ) {
                return Promise.resolve({
                  id: mockCreateAddressesDto.delivery_person_id,
                });
              }
              if (options.where.id === mockCreateAddressesDto.user_id) {
                return Promise.resolve({ id: mockCreateAddressesDto.user_id });
              }
              return Promise.resolve(null);
            }),
          },
        },
        {
          provide: DebtsService,
          useValue: {
            create: jest.fn().mockResolvedValue(true),
          },
        },
        {
          provide: StateHistoryService,
          useValue: {
            createStateHistoryAddresses: jest.fn().mockResolvedValue(true),
          },
        },
        {
          provide: OriginService,
          useValue: {
            findOne: jest.fn().mockResolvedValue({ id: 'origin-id' }),
          },
        },
      ],
    }).compile();

    service = module.get<AddressessService>(AddressessService);
    addressesRepository = module.get(getRepositoryToken(Addresses));
    statusAddressesRepository = module.get(getRepositoryToken(StatusAddresses));
    zoneRepository = module.get(getRepositoryToken(Zone));
    userRepository = module.get(getRepositoryToken(User));
    debtService = module.get(DebtsService);
    stateHistoryService = module.get(StateHistoryService);
    originService = module.get(OriginService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should successfully create an address', async () => {
      const result = await service.create(mockCreateAddressesDto);

      expect(result).toEqual(mockAddress);
      expect(addressesRepository.create).toHaveBeenCalledWith({
        ...mockCreateAddressesDto,
        zone: { id: 'zone-id' },
        state: { id: 'state-id', state: 'en preparacion' },
        user: { id: mockCreateAddressesDto.user_id },
        deliveryPerson: { id: mockCreateAddressesDto.delivery_person_id },
        origin : { id : mockCreateAddressesDto.origin_id },
      });
      expect(addressesRepository.save).toHaveBeenCalledWith(mockAddress);
      expect(debtService.create).toHaveBeenCalled();
    });

    it('should throw NotFoundException if state is not found', async () => {
      statusAddressesRepository.findOne.mockResolvedValueOnce(null);
      await expect(service.create(mockCreateAddressesDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(statusAddressesRepository.findOne).toHaveBeenCalledWith({
        where: { state: mockCreateAddressesDto.state_name },
      });
    });

    it('should throw NotFoundException if zone is not found', async () => {
      zoneRepository.findOne.mockResolvedValueOnce(null);
      await expect(service.create(mockCreateAddressesDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(zoneRepository.findOne).toHaveBeenCalledWith({
        where: { id: mockCreateAddressesDto.zone_id },
      });
    });

    it('should throw NotFoundException if delivery person is not found', async () => {
      userRepository.findOne.mockResolvedValueOnce(null);
      await expect(service.create(mockCreateAddressesDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { id: mockCreateAddressesDto.delivery_person_id },
      });
    });

    it('should throw NotFoundException if user is not found', async () => {
      userRepository.findOne.mockResolvedValueOnce(null);
      await expect(service.create(mockCreateAddressesDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { id: mockCreateAddressesDto.user_id },
      });
    });

    it('should throw NotFoundException if origin is not found', async () => {
      originService.findOne.mockResolvedValueOnce(null);
      await expect(service.create(mockCreateAddressesDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(originService.findOne).toHaveBeenCalledWith(mockCreateAddressesDto.origin_id);
    });

    it('should throw InternalServerErrorException on unexpected errors', async () => {
      statusAddressesRepository.findOne.mockImplementation(() => {
        throw new Error('Unexpected error');
      });

      await expect(service.create(mockCreateAddressesDto)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});