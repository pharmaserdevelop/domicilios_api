import { Module } from '@nestjs/common';
import { StateHistoryService } from './state_history.service';
import { StateHistoryController } from './state_history.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StateHistory } from './entities/state_history.entity';
import { Addresses } from 'src/addresses/entities/addresse.entity';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([StateHistory, Addresses])],
  controllers: [StateHistoryController],
  providers: [StateHistoryService],
  exports: [StateHistoryService],
})
export class StateHistoryModule {}
