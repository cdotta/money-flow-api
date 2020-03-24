import { InputType, Field } from 'type-graphql';

import { Payment } from './entity';

@InputType()
export class PaymentInput implements Partial<Payment> {
  @Field()
  description: string;

  @Field()
  amount: number;

  @Field()
  dueMonth: number;

  @Field()
  dueYear: number;
}

@InputType()
export class PaymentFilterInput {
  @Field({ nullable: true })
  pending?: boolean;

  @Field({ nullable: true })
  fromDueMonth?: number;

  @Field({ nullable: true })
  toDueMonth?: number;

  @Field({ nullable: true })
  fromDueYear?: number;

  @Field({ nullable: true })
  toDueYear?: number;
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
