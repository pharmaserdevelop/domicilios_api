import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from 'src/roles/entities/role.entity';
import { JwtService } from '@nestjs/jwt';
import { In, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}
  async create(createUserDto: CreateUserDto, __role?: string) {
    try {
      const { password, roles, ...userData } = createUserDto;

      const userRoles = await this.roleRepository.find({
        where: { name: In(roles && roles.length > 0 ? roles : ['user']) },
      });

      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
        roles: userRoles,
      });

      await this.userRepository.save(user);
      delete user.password;

      // return { ...user, token: this.getJwtToken({ id: user.id, email: user.email }) };\
      return { token: this.getJwtToken({ id: user.id, email: user.email }) };
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
}
