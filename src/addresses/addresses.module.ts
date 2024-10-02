import { Module } from '@nestjs/common';
import { AddressessService } from './addresses.service';
import { AddressessController } from './addresses.controller';
import { Addresses } from './entities/addresse.entity';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatusAddresses } from 'src/status-addresses/entities/status-addresses.entity';
import { StatusAddressesModule } from 'src/status-addresses/status-addresses.module';
import { StateHistory } from '../state_history/entities/state_history.entity';
import { ZonesModule } from 'src/zones/zones.module';
import { Zone } from 'src/zones/entities/zone.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Addresses, StatusAddresses, StateHistory, Zone]),
    StatusAddressesModule,
    ZonesModule,
  ],
  controllers: [AddressessController],
  providers: [AddressessService],
})
export class AddressessModule {}
