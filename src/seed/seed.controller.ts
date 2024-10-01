import { Controller, Get } from '@nestjs/common';
import { RoleSeed } from './seeds/roles.seed';
import { UserSeed } from './seeds/user.seed';
import { StatusAddressesSeed } from './seeds/status-addresses.seed';

@Controller('seed')
export class SeedController {
  constructor(
    private readonly roleSeed: RoleSeed,
    private readonly userSeed: UserSeed,
    private readonly estadosAddressessSeed: StatusAddressesSeed,
  ) {}

  @Get('roles')
  async createRoles() {
    return this.roleSeed.run();
  }

  @Get('users')
  async createUsers() {
    return this.userSeed.run();
  }
  @Get('estados')
  async createEstados() {
    return this.estadosAddressessSeed.run();
  }
}
