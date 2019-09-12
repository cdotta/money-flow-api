import { Resolver, Query, Mutation, Arg, ID } from 'type-graphql';

import { Payment } from './entity';
import { PaymentService } from './service';
import { PaymentInput, PaymentUpdateInput } from './input';

@Resolver()
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}

  @Query(() => [Payment])
  payments(): Promise<Payment[]> {
    return this.paymentService.all();
  }

  @Mutation(() => Payment)
  async createPayment(@Arg('data') data: PaymentInput) {
    return this.paymentService.create(data);
  }

  @Mutation(() => Payment)
  async updatePayment(@Arg('id', () => ID) id: string, @Arg('data') data: PaymentUpdateInput) {
    return this.paymentService.update(id, data);
  }
}
