import { PartialType } from '@nestjs/mapped-types';
import { CreateStateHistoryDebtDto } from './create-state_history_debt.dto';

export class UpdateStateHistoryDebtDto extends PartialType(CreateStateHistoryDebtDto) {}
