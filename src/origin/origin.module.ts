import { Module } from '@nestjs/common';
import { OriginService } from './origin.service';
import { OriginController } from './origin.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Origin } from './entities/origin.entity';
import { Addresses } from 'src/addresses/entities/addresse.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Origin, Addresses]), AuthModule],
  controllers: [OriginController],
  providers: [OriginService],
  exports: [OriginService],
})
export class OriginModule {}
