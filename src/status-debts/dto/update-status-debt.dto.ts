import { PartialType } from '@nestjs/mapped-types';
import { CreateStatusDebtDto } from './create-status-debt.dto';

export class UpdateStatusDebtDto extends PartialType(CreateStatusDebtDto) {}
