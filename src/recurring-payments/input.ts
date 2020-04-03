import { InputType, Field } from 'type-graphql';

import { RecurringPayment } from './entity';

@InputType()
export class RecurringPaymentInput implements Partial<RecurringPayment> {
  @Field()
  description: string;

  @Field()
  defaultAmount: number;
}
