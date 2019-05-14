import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { PaymentInput } from './input';

@ObjectType()
@Entity()
export class Payment {
  constructor(input: PaymentInput | null) {
    if (!input) {
      return;
    }
    const { description, amount } = input;
    this.description = description;
    this.amount = amount;
  }

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column({ type: 'float' })
  amount: number;

  @Column({ default: false })
  pending: boolean;

  @Field()
  @Column({ name: 'paid_at', nullable: true })
  paidAt: Date;
}
