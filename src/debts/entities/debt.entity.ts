import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { User } from '../../users/entities/user.entity';

import { Addresses } from 'src/addresses/entities/addresse.entity';
import { StatusDebt } from 'src/status-debts/entities/status-debt.entity';

@Entity('debts')
export class Debt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'datetime' })
  date: Date;

  @Column({ type: 'int' })
  amount: number;

  @ManyToOne(() => User)
  deliveryPerson: User;

  @ManyToOne(() => Addresses)
  address: Addresses;

  @ManyToOne(() => StatusDebt)
  state_debt: StatusDebt;
}
