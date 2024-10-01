import { Module } from '@nestjs/common';
import { SeedController } from './seed.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleSeed } from './seeds/roles.seed';
import { UserSeed } from './seeds/user.seed';
import { Role } from 'src/roles/entities/role.entity';
import { User } from 'src/users/entities/user.entity';

import { StatusAddressesSeed } from './seeds/status-addresses.seed';
import { StatusAddresses } from 'src/status-addresses/entities/status-addresses.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role, User, StatusAddresses])],
  providers: [RoleSeed, UserSeed, StatusAddressesSeed],
  controllers: [SeedController],
})
export class SeedModule {}
