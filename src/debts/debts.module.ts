import { forwardRef, Module } from '@nestjs/common';
import { DebtsService } from './debts.service';
import { DebtsController } from './debts.controller';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Debt } from './entities/debt.entity';
import { AddressessModule } from 'src/addresses/addresses.module';
import { User } from 'src/users/entities/user.entity';
import { StatusDebt } from 'src/status-debts/entities/status-debt.entity';
import { StateHistoryDebt } from 'src/state_history_debts/entities/state_history_debt.entity';
import { StateHistoryDebtsModule } from 'src/state_history_debts/state_history_debts.module';

@Module({
  controllers: [DebtsController],
  providers: [DebtsService],
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Debt, User, StatusDebt, StateHistoryDebt]),
    AuthModule,
    StateHistoryDebtsModule,
    forwardRef(() => AddressessModule),
  ],
  exports: [DebtsService],
})
export class DebtsModule {}
