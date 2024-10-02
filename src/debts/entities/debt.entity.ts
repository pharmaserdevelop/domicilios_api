import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { User } from '../../users/entities/user.entity';

import { Addresses } from 'src/addresses/entities/addresse.entity';
import { StatusAddresses } from 'src/status-addresses/entities/status-addresses.entity';

@Entity('debts')
export class Debt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'datetime' })
  date: Date;

  @Column({ type: 'int' })
  amount: number;

  @ManyToOne(() => StatusAddresses)
  state: StatusAddresses;

  @ManyToOne(() => User)
  deliveryPerson: User;

  @ManyToOne(() => Addresses)
  address: Addresses;
}
