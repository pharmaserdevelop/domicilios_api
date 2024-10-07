import { Module } from '@nestjs/common';
import { StatusDebtsService } from './status-debts.service';
import { StatusDebtsController } from './status-debts.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatusDebt } from './entities/status-debt.entity';
import { ValidationModule } from 'src/validation/validation.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([StatusDebt]),
    ValidationModule,
  ],
  controllers: [StatusDebtsController],
  providers: [StatusDebtsService],
})
export class StatusDebtsModule {}
