import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class VirtualPayment {
  @Field()
  id: string;

  @Field()
  description: string;

  @Field()
  amount: number;

  @Field()
  pending: boolean;

  @Field()
  dueMonth: number;

  @Field()
  dueYear: number;

  @Field()
  recurringPaymentId: number;
}
