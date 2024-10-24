import { Debt } from 'src/debts/entities/debt.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class PaymentSupport {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Debt, (debt) => debt.paymentSupports)
  debt: Debt;

  @Column()
  nameFile: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateUpload: Date;
}
