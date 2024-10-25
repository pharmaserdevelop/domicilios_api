import { Address } from 'cluster';
import { Addresses } from 'src/addresses/entities/addresse.entity';
import { UserOrigin } from 'src/user-origin/entities/user-origin.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('origin')
export class Origin {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  origin: string;

  @CreateDateColumn({ type: 'datetime' })
  date: Date;

  @OneToMany(() => Addresses, (addresses) => addresses.origin)
  addresses: Address[];

  @OneToMany(() => UserOrigin, (userOrigin) => userOrigin.origin)
  userOrigins: UserOrigin[];
}
