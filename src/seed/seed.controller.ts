import { Controller, Get } from '@nestjs/common';
import { RoleSeed } from './seeds/roles.seed';
import { UserSeed } from './seeds/user.seed';
import { StatusAddressesSeed } from './seeds/status-addresses.seed';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ZonesSeed } from './seeds/zones.seed';
import { OriginSeed } from './seeds/origen.seed';
import { statusDebtSeed } from './seeds/status-debt.seed';
@ApiTags('seed')
@Controller('seed')
export class SeedController {
  constructor(
    private readonly roleSeed: RoleSeed,
    private readonly userSeed: UserSeed,
    private readonly estadosAddressessSeed: StatusAddressesSeed,
    private readonly zonesSeed: ZonesSeed,
    private readonly originSeed: OriginSeed,
    private readonly statusDebtSeed: statusDebtSeed,
  ) {}

  @Get('roles')
  @ApiOperation({ summary: 'Create seed data for roles' })
  @ApiResponse({
    status: 200,
    description: 'Roles have been successfully seeded.',
  })
  async createRoles() {
    return this.roleSeed.run();
  }

  @Get('users')
  @ApiOperation({ summary: 'Create seed data for users' })
  @ApiResponse({
    status: 200,
    description: 'Users have been successfully seeded.',
  })
  async createUsers() {
    return this.userSeed.run();
  }

  @Get('status')
  @ApiOperation({ summary: 'Create seed data for address statuses' })
  @ApiResponse({
    status: 200,
    description: 'Address statuses have been successfully seeded.',
  })
  async createEstados() {
    return this.estadosAddressessSeed.run();
  }

  @Get('zones')
  async createZones() {
    return this.zonesSeed.run();
  }

  @Get('origin')
  async createOrigin() {
    return this.originSeed.run();
  }

  @Get('status-debt')
  async createStatusDebt() {
    return this.statusDebtSeed.run();
  }
}
