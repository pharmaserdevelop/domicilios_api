import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('zonas')
export class Zone {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  nameZone: string;
}
