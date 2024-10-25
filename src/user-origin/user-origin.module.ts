import { Module } from '@nestjs/common';
import { UserOriginService } from './user-origin.service';
import { UserOriginController } from './user-origin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrigin } from './entities/user-origin.entity';
import { User } from 'src/users/entities/user.entity';
import { Origin } from 'src/origin/entities/origin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserOrigin, User, Origin])],
  controllers: [UserOriginController],
  providers: [UserOriginService],
  exports: [UserOriginService, TypeOrmModule],
})
export class UserOriginModule {}
