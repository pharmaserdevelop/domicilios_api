import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Log in a user' })
  @ApiResponse({
    status: 200,
    description: 'User successfully logged in.',
    type: String,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Invalid login credentials.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. Invalid email or password.',
  })
  create(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }
}
