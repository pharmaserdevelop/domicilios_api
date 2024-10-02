import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { StatusAddresses } from '../../status-addresses/entities/status-addresses.entity';
import { Zone } from '../../zones/entities/zone.entity';

@Entity('addresses')
export class Addresses {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  user: User;

  @Column({ type: 'varchar', length: 255 })
  origin: string;

  @ManyToOne(() => StatusAddresses)
  state: StatusAddresses;

  @Column({ type: 'boolean', default: false })
  mutualAgreement: boolean;

  @Column()
  value: number;

  @ManyToOne(() => Zone)
  zone: Zone;

  @CreateDateColumn({ type: 'datetime' })
  date: Date;

  @Column({ type: 'varchar', length: 255, default: '0' })
  imageUrl: string;

  @Column({ type: 'varchar', length: 255, default: '0' })
  signature: string;

  @Column({ type: 'boolean', default: false })
  finishedState: boolean;

  @ManyToOne(() => User)
  deliveryPerson: User;
}
