import { Resolver, Query, Mutation, Arg, ID } from 'type-graphql';

import { Payment } from './entity';
import { PaymentService } from './service';
import { PaymentInput, PaymentUpdateInput, PaymentFilterInput } from './input';

@Resolver()
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}

  @Query(() => [Payment])
  payments(@Arg('filter', { nullable: true }) filter: PaymentFilterInput): Promise<Payment[]> {
    return this.paymentService.all(filter);
  }

  @Mutation(() => Payment)
  async createPayment(@Arg('payment') payment: PaymentInput): Promise<Payment> {
    return this.paymentService.create(payment);
  }

  @Mutation(() => Payment)
  async updatePayment(@Arg('id', () => ID) id: string, @Arg('data') data: PaymentUpdateInput) {
    return this.paymentService.update(id, data);
  }
}
