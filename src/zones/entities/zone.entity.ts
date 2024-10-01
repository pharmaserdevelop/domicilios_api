import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('zonas')
export class Zona {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  nameZone: string;
}
