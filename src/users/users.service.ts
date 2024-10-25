import {
  BadRequestException,
  Get,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from 'src/roles/entities/role.entity';
import { JwtService } from '@nestjs/jwt';
import { createQueryBuilder, In, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';
import { OriginService } from 'src/origin/origin.service';
import { UserOrigin } from 'src/user-origin/entities/user-origin.entity';
import { find, map } from 'rxjs';
import { Origin } from 'src/origin/entities/origin.entity';
import { log } from 'console';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly originService: OriginService,
    @InjectRepository(UserOrigin)
    private readonly userOriginRepository: Repository<UserOrigin>,
    @InjectRepository(Origin)
    private originRepository: Repository<Origin>,
  ) {}
  async create(createUserDto: CreateUserDto, role?: string) {
    try {
      const { password, roles, ...userData } = createUserDto;

      const userRoles = await this.roleRepository.find({
        where: {
          name: In(roles && roles.length > 0 ? roles : ['domiciliario']),
        },
      });

      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
        roles: userRoles,
      });

      await this.userRepository.save(user);
      delete user.password;

      //  return {
      //    ...user,
      //    token: this.getJwtToken({ id: user.id, email: user.email }),
      //  };
      return { token: this.getJwtToken({ id: user.id }) };
    } catch (error) {
      this.handleDBrrors(error);
    }
  }

  private handleDBrrors(error: any) {
    if (error.errno === 1062) {
      throw new BadRequestException(error.sqlMessage);
      console.log(error);
      throw new InternalServerErrorException('Please check server error');
    }
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  findAll() {
    return this.userRepository.find();
  }

  async findAllUsersDelivery() {
    try {
      const users = await this.userRepository.find({
        relations: ['roles'],
        where: {
          roles: { name: 'domiciliario' },
        },
      });

      return users;
    } catch (error) {
      this.handleDBrrors(error);
    }
  }

  async findOne(userId: string) {
    const user = this.findAddressById(userId);
    return user;
  }

  private async findAddressById(userId: string): Promise<User> {
    const addresses = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!addresses) {
      throw new NotFoundException(`Addresses with ID ${userId} not found`);
    }

    return addresses;
  }

  async assignOriginToUser(
    userId: string,
    originId: string,
  ): Promise<UserOrigin> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const origin = await this.originService.findOne(originId);

    if (!user || !origin) {
      throw new Error('User or Origin not found');
    }

    const userOrigin = new UserOrigin();
    userOrigin.user = user;
    userOrigin.origin = origin;

    return this.userOriginRepository.save(userOrigin);
  }

  async findUsersByOrigin(originId: string): Promise<User[]> {
    console.log('Checking for origin with ID:', originId);

    const origin = await this.originRepository.findOne({
      where: { id: originId },
    });

    if (!origin) {
      throw new NotFoundException(`Origin with ID ${originId} not found`);
    }

    try {
      const users = await this.userRepository
        .createQueryBuilder('user')
        .innerJoinAndSelect(
          UserOrigin,
          'userOrigin',
          'user.id = userOrigin.user.id',
        )
        .where('userOrigin.origin.id = :originId', { originId })
        .getMany();

      console.log('Users found:', users);
      return users;
    } catch (error) {
      console.error('Error querying users:', error);
      throw new InternalServerErrorException('Error querying users');
    }
  }

  async findOriginByUserId(userId: string): Promise<Origin[]> {
    console.log('Finding origins for user with ID:', userId);

    // Verifica si el usuario existe
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    try {
      // Realiza la consulta para obtener los orígenes asociados al usuario
      const userOrigins = await this.userOriginRepository.find({
        where: { user: { id: userId } },
        relations: ['origin'], // Asegúrate de incluir la relación con Origin
      });

      // Extrae los orígenes de las relaciones
      const origins = userOrigins.map((userOrigin) => userOrigin.origin);

      console.log('Origins found:', origins);
      return origins;
    } catch (error) {
      console.error('Error querying origins:', error);
      throw new InternalServerErrorException('Error querying origins');
    }
  }
}
