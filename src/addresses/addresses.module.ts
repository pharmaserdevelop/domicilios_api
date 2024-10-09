import { forwardRef, Module } from '@nestjs/common';
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
import { User } from 'src/users/entities/user.entity';
import { Debt } from 'src/debts/entities/debt.entity';
import { DebtsModule } from 'src/debts/debts.module';
import { StateHistoryModule } from 'src/state_history/state_history.module';
import { DeliveryReceiverModule } from 'src/delivery_receiver/delivery_receiver.module';
import { Origin } from 'src/origin/entities/origin.entity';
import { OriginModule } from 'src/origin/origin.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([
      Addresses,
      StatusAddresses,
      StateHistory,
      Zone,
      User,
      Debt,
      Origin,
    ]),
    StatusAddressesModule,
    ZonesModule,
    StateHistoryModule,
    forwardRef(() => DebtsModule),
    forwardRef(() => DeliveryReceiverModule),
    OriginModule,
  ],
  controllers: [AddressessController],
  providers: [AddressessService],
  exports: [AddressessService, TypeOrmModule],
})
export class AddressessModule {}
