import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Payment } from '../payments/entity';

@ObjectType()
@Entity()
export class RecurringPayment {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ nullable: false })
  description: string;

  @Field()
  @Column({ type: 'float', nullable: false })
  defaultAmount: number;

  @OneToMany(() => Payment, payment => payment.recurringPayment)
  @JoinColumn()
  payments: Payment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
