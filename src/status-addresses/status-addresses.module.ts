import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatusAddresses } from './entities/status-addresses.entity';
import { ValidationModule } from 'src/validation/validation.module';
import { StatusAddressesController } from './status-addresses.controller';
import { StatusAddressesService } from './status-addresses.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [StatusAddressesController],
  providers: [StatusAddressesService],
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([StatusAddresses]),
    ValidationModule,
    AuthModule
  ],
  exports: [StatusAddressesService],
})
export class StatusAddressesModule {}
