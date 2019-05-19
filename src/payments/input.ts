import { InputType, Field } from 'type-graphql';

import { Payment } from './entity';

@InputType()
export class PaymentInput implements Partial<Payment> {
  @Field()
  description: string;

  @Field()
  amount: number;
}
