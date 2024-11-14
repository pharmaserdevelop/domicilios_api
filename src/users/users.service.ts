import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from 'src/roles/entities/role.entity';
import { JwtService } from '@nestjs/jwt';
import { In, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';
import { OriginService } from 'src/origin/origin.service';
import { UserOrigin } from 'src/user-origin/entities/user-origin.entity';
import { Origin } from 'src/origin/entities/origin.entity';
import { ValidationService } from 'src/validation/validation.service';

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
    private readonly originRepository: Repository<Origin>,
    private readonly validationService : ValidationService 
  ) {}
  async create(createUserDto: CreateUserDto, role?: string) {
    try {
      const { password, roles, ...userData } = createUserDto;

      const userRoles = await this.roleRepository.find({
        where: {
          name: In(role ? [role] : ['domiciliario']),
        },
      });

      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
        roles: userRoles,
      });

      await this.userRepository.save(user);
      delete user.password;

      return { token: this.getJwtToken({ id: user.id }) };
    } catch (error) {
      await this.validationService.handleDBrrors(error);
    }
  }



  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  findAll() {
    return this.userRepository.find({ relations: ['roles'] });
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
      this.validationService.handleDBrrors(error);
    }
  }

  async findOne(userId: string) {
    const user = await this.findAUser(userId);
    return user;
  }

  private async findAUser(userId: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['roles'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return user;
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
    const origin = await this.originRepository.findOne({
      where: { id: originId },
    });

    if (!origin) {
      throw new NotFoundException(`Origin with ID ${originId} not found`);
    }

    try {
      const usersWithOrigin = await this.userRepository
        .createQueryBuilder('user')
        .innerJoinAndSelect(
          UserOrigin,
          'userOrigin',
          'user.id = userOrigin.user.id',
        )
        .where('userOrigin.origin.id = :originId', { originId })
        .getMany();

      const usersWithoutOrigin = await this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect(
          UserOrigin,
          'userOrigin',
          'user.id = userOrigin.user.id',
        )
        .where('userOrigin.origin.id IS NULL')
        .getMany();

      const combinedUsers = [...usersWithOrigin, ...usersWithoutOrigin];

      const userIds = combinedUsers.map((user) => user.id);
      const usersWithRoles = await this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.roles', 'role')
        .where('user.id IN (:...userIds)', { userIds })
        .getMany();

      console.log('Users found:', usersWithRoles);
      return usersWithRoles;
    } catch (error) {
      console.error('Error querying users:', error);
      throw new InternalServerErrorException('Error querying users');
    }
  }

  async findOriginByUserId(userId: string): Promise<Origin[]> {
    console.log('Finding origins for user with ID:', userId);

    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    try {
      const userOrigins = await this.userOriginRepository.find({
        where: { user: { id: userId } },
        relations: ['origin'],
      });

      const origins = userOrigins.map((userOrigin) => userOrigin.origin);

      console.log('Origins found:', origins);
      return origins;
    } catch (error) {
      console.error('Error querying origins:', error);
      throw new InternalServerErrorException('Error querying origins');
    }
  }
}
