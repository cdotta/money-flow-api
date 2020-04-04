import { InputType, Field } from 'type-graphql';

@InputType()
export class VirtualPaymentFilterInput {
  @Field()
  dueMonth: number;

  @Field()
  dueYear: number;
}
