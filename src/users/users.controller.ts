import {
  Controller,
  Post,
  Body,
  Get,
  NotFoundException,
  Param,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorater';
import { User } from './entities/user.entity';
import { Origin } from 'src/origin/entities/origin.entity';
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Auth('admin')
  @Post('admin')
  @ApiOperation({ summary: 'Create a new admin user' })
  @ApiResponse({
    status: 201,
    description: 'The admin user has been successfully created.',
    type: CreateUserDto,
  })
  async createAdmin(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto, 'admin');
  }
  @Post('domiciliario')
  @ApiOperation({ summary: 'Create a new domiciliary user' })
  @ApiResponse({
    status: 201,
    description: 'The domiciliary user has been successfully created.',
    type: CreateUserDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request. Invalid user data.' })
  async createManager(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto, 'domiciliario');
  }

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }
  @Get('findAllUsersDelivery')
  async findAllUsersDelivery() {
    return this.usersService.findAllUsersDelivery();
  }

  @Get('finduser/:id')
  findOneUser(id: string) {
    return this.usersService.findOne(id);
  }

  @Post(':userId/assign-origin')
  async assignOriginToUser(
    @Param('userId') userId: string,
    @Body('originId') originId: string,
  ) {
    const user = await this.usersService.assignOriginToUser(userId, originId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  @Get('by-origin/:originId')
  async getUsersByOrigin(@Param('originId') originId: string): Promise<User[]> {
    try {
      return await this.usersService.findUsersByOrigin(originId);
    } catch (error) {
      console.error('Error in getUsersByOrigin:', error);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  @Get(':id/origins')
  async getOriginsByUserId(@Param('id') userId: string): Promise<Origin[]> {
    console.log('getOriginsByUserId called with userId:', userId);
    return this.usersService.findOriginByUserId(userId);
  }
}
