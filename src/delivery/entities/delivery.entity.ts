import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('delivery')
export class Delivery {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'datetime' })
  date: Date;

  @ManyToOne(() => User)
  deliveryPerson: User;
}
