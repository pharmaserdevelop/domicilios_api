import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/roles/entities/role.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class RoleSeed {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly dataSource: DataSource,
  ) {}

  async run() {
    await this.dataSource.query('SET FOREIGN_KEY_CHECKS = 0');
    await this.dataSource.query('DELETE FROM user_roles');
    await this.dataSource.query('TRUNCATE TABLE roles');
    await this.dataSource.query('SET FOREIGN_KEY_CHECKS = 1');

    const roles = [
      { name: 'admin' },
      { name: 'super-admin' },
      { name: 'domiciliario' },
    ];

    await this.roleRepository.save(roles);

    return { message: 'Roles have been reset successfully' };
  }
}
