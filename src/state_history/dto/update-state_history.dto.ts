import { PartialType } from '@nestjs/mapped-types';
import { CreateStateHistoryDto } from './create-state_history.dto';

export class UpdateStateHistoryDto extends PartialType(CreateStateHistoryDto) {}
