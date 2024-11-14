import { Module } from '@nestjs/common';
import { StateHistoryDebtsService } from './state_history_debts.service';
import { StateHistoryDebtsController } from './state_history_debts.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StateHistoryDebt } from './entities/state_history_debt.entity';
import { Debt } from 'src/debts/entities/debt.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [StateHistoryDebtsController],
  providers: [StateHistoryDebtsService],
  imports: [ConfigModule, TypeOrmModule.forFeature([StateHistoryDebt, Debt]), AuthModule],
  exports: [StateHistoryDebtsService],
})
export class StateHistoryDebtsModule {}
