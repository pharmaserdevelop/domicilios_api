import { Origin } from 'src/origin/entities/origin.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_origins')
export class UserOrigin {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.userOrigins)
  user: User;

  @ManyToOne(() => Origin, (origin) => origin.userOrigins)
  @JoinColumn({ name: 'originId' })
  origin: Origin;
}
