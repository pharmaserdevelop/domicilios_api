import { Addresses } from 'src/addresses/entities/addresse.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

@Entity('delivery_receivers')
export class DeliveryReceivers {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Addresses, (address) => address.deliveryReceivers)
  address: Addresses;

  @Column({ type: 'varchar', length: 255 })
  receiverName: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  receiverPhone?: string;

  @CreateDateColumn({ type: 'datetime' })
  dateReceived: Date;
}
