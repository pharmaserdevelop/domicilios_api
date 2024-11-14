import { StatusAddresses } from 'src/status-addresses/entities/status-addresses.entity';
import { Addresses } from '../../addresses/entities/addresse.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('state_history')
export class StateHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Addresses)
  addresses: Addresses;

  @ManyToOne(() => StatusAddresses)
  state: StatusAddresses;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;
}
