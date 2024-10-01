import { Module } from '@nestjs/common';
import { DebtsService } from './debts.service';
import { DebtsController } from './debts.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [DebtsController],
  providers: [DebtsService],
  imports: [AuthModule],
})
export class DebtsModule {}
