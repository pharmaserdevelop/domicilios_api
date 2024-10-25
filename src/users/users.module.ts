import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UserOriginModule } from 'src/user-origin/user-origin.module';
import { OriginModule } from 'src/origin/origin.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [AuthModule, UserOriginModule, OriginModule],
})
export class UsersModule {}
