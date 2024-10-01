import { Module } from '@nestjs/common';
import { ZonasService } from './zones.service';
import { ZonasController } from './zones.controller';
import { ConfigModule } from '@nestjs/config';
import { Zona } from './entities/zone.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValidationModule } from 'src/validation/validation.module';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Zona]), ValidationModule],
  controllers: [ZonasController],
  providers: [ZonasService],
})
export class ZonasModule {}
