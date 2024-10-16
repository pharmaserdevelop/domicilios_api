import { Controller, Post, Body, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorater';
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

  @Get(':id')
  async findOneUser(id: string) {
    return this.usersService.findOne(id);
  }
}
