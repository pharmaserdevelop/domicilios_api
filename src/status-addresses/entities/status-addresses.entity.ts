import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('status_addresses')
export class StatusAddresses {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'varchar', length: 255 })
  state: string;
}
