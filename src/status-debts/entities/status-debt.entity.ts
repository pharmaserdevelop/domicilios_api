import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('status_debts')
export class StatusDebt {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'varchar', length: 255 })
  state_debt: string;
}
