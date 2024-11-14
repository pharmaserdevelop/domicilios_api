import { Module } from '@nestjs/common';
import { SeedController } from './seed.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleSeed } from './seeds/roles.seed';
import { UserSeed } from './seeds/user.seed';
import { Role } from 'src/roles/entities/role.entity';
import { User } from 'src/users/entities/user.entity';

import { StatusAddressesSeed } from './seeds/status-addresses.seed';
import { StatusAddresses } from 'src/status-addresses/entities/status-addresses.entity';
import { Zone } from 'src/zones/entities/zone.entity';
import { ZonesSeed } from './seeds/zones.seed';
import { Origin } from 'src/origin/entities/origin.entity';
import { OriginSeed } from './seeds/origen.seed';
import { StatusDebt } from 'src/status-debts/entities/status-debt.entity';
import { statusDebtSeed } from './seeds/status-debt.seed';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Role,
      User,
      StatusAddresses,
      Zone,
      Origin,
      StatusDebt,
    ]),
  ],
  providers: [
    RoleSeed,
    UserSeed,
    StatusAddressesSeed,
    ZonesSeed,
    OriginSeed,
    statusDebtSeed,
  ],
  controllers: [SeedController],
})
export class SeedModule {}
