import { Debt } from 'src/debts/entities/debt.entity';
import { StatusDebt } from 'src/status-debts/entities/status-debt.entity';
import { PrimaryGeneratedColumn, ManyToOne, Column, Entity } from 'typeorm';
@Entity('state_history_debt')
export class StateHistoryDebt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Debt)
  debt: Debt;

  @ManyToOne(() => StatusDebt)
  state_debt: StatusDebt;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;
}
