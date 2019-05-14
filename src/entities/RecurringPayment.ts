import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class RecurringPayment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
