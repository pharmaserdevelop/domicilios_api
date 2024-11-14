import { Module } from '@nestjs/common';
import { ZonesService } from './zones.service';
import { ZonesController } from './zones.controller';
import { ConfigModule } from '@nestjs/config';
import { Zone } from './entities/zone.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValidationModule } from 'src/validation/validation.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Zone]), ValidationModule, AuthModule],
  controllers: [ZonesController],
  providers: [ZonesService],
  exports: [ZonesService],
})
export class ZonesModule {}
