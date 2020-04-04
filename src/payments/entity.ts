import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Min, Max } from 'class-validator';
import { RecurringPayment } from '../recurring-payments/entity';

@ObjectType()
@Entity()
export class Payment {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ nullable: false })
  description: string;

  @Field()
  @Column({ type: 'float', nullable: false })
  amount: number;

  @Field()
  @Column({ default: true })
  pending: boolean;

  @Field()
  @Column({ name: 'due_month', nullable: false })
  @Min(1)
  @Max(12)
  dueMonth: number;

  @Field()
  @Column({ name: 'due_year', nullable: false })
  dueYear: number;

  @Field({ nullable: true })
  @Column({ name: 'recurring_payment_id', nullable: true })
  recurringPaymentId?: number;

  @ManyToOne(() => RecurringPayment, recurringPayment => recurringPayment.payments)
  @JoinColumn({ name: 'recurring_payment_id' })
  recurringPayment: RecurringPayment;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
