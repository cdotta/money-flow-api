import { InputType, Field } from 'type-graphql';

import { Payment } from './entity';

@InputType()
export class PaymentInput implements Partial<Payment> {
  @Field()
  description: string;

  @Field()
  amount: number;

  @Field()
  dueDate: Date;
}

@InputType()
export class PaymentUpdateInput implements Partial<Payment> {
  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  amount: number;

  @Field({ nullable: true })
  pending: boolean;

  @Field({ nullable: true })
  dueDate: Date;
}
