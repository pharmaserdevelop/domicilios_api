import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { StatusAddresses } from '../../status-addresses/entities/status-addresses.entity';
import { Zone } from '../../zones/entities/zone.entity';
import { DeliveryReceivers } from 'src/delivery_receiver/entities/delivery_receiver.entity';
import { Origin } from 'src/origin/entities/origin.entity';

@Entity('addresses')
export class Addresses {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => StatusAddresses)
  state: StatusAddresses;

  @Column({ type: 'boolean', default: false })
  mutualAgreement: boolean;

  @Column()
  value: number;

  @Column({ type: 'varchar', default: '0' })
  affiliateDocument: string;

  @Column({ type: 'varchar', default: '0' })
  affiliateName: string;

  @Column({ type: 'varchar', default: '0' })
  affiliatePhone: string;

  @Column()
  addresses: string;

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

  @OneToMany(() => DeliveryReceivers, (receiver) => receiver.address)
  deliveryReceivers: DeliveryReceivers[];

  @ManyToOne(() => Origin, (origin) => origin.addresses)
  origin: Origin;
}
