import { InputType, Field } from 'type-graphql';

@InputType()
export class VirtualPaymentFilterInput {
  @Field()
  dueMonth: number;

  @Field()
  dueYear: number;
}

@InputType()
export class MaterializePaymentInput {
  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  amount: number;

  @Field({ nullable: true })
  pending: boolean;

  @Field()
  dueMonth: number;

  @Field()
  dueYear: number;
}
