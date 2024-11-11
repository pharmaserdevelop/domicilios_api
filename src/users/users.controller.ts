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

  @Auth('')
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
  @ApiOperation({ summary: 'Search all users' })
  @ApiResponse({
    status: 201,
    description: 'users were found.',
  })
  @ApiResponse({ status: 400, description: 'Users not found.' })
  async findAll() {
    return this.usersService.findAll();
  }

  @Get('findAllUsersDelivery')
  @ApiOperation({ summary: 'Search all deliverys' })
  @ApiResponse({
    status: 201,
    description: 'deliverys were found.',
  })
  @ApiResponse({ status: 400, description: 'Deliverys not found.' })
  async findAllUsersDelivery() {
    return this.usersService.findAllUsersDelivery();
  }

  @Get('finduser/:id')
  @ApiOperation({ summary: 'Search a users' })
  @ApiResponse({
    status: 201,
    description: 'user were found.',
  })
  @ApiResponse({ status: 400, description: 'User not found.' })
  findOneUser(@Param('id') id: string) {
    console.log('user');
    return this.usersService.findOne(id);
  }

  @Post(':userId/assign-origin')
  @ApiOperation({ summary: 'Assign a user to a origin' })
  @ApiResponse({
    status: 201,
    description: 'User successfully assigned',
  })
  @ApiResponse({ status: 400, description: 'Bad Request. Invalid  data.' })
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
  @ApiOperation({ summary: 'List users of an origin' })
  @ApiResponse({
    status: 201,
    description: 'User successfully found',
  })
  @ApiResponse({ status: 400, description: 'users not found' })
  async getUsersByOrigin(@Param('originId') originId: string): Promise<User[]> {
    try {
      return await this.usersService.findUsersByOrigin(originId);
    } catch (error) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  @Get(':id/origins')
  @ApiOperation({ summary: 'Search the origins of a user' })
  @ApiResponse({
    status: 201,
    description: 'Origins successfully found',
  })
  @ApiResponse({ status: 400, description: 'origins not found' })
  async getOriginsByUserId(@Param('id') userId: string): Promise<Origin[]> {
    return this.usersService.findOriginByUserId(userId);
  }
}
