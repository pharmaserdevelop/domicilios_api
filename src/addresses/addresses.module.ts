import { Module } from '@nestjs/common';
import { AddressessService } from './addresses.service';
import { AddressessController } from './addresses.controller';
import { Addresses } from './entities/addresse.entity';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatusAddresses } from 'src/status-addresses/entities/status-addresses.entity';
import { StatusAddressesModule } from 'src/status-addresses/status-addresses.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Addresses, StatusAddresses]),
    StatusAddressesModule,
  ],
  controllers: [AddressessController],
  providers: [AddressessService],
})
export class AddressessModule {}
