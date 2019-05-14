import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { Payment } from './entity';
import { PaymentService } from './service';
import { PaymentInput } from './input';

@Resolver()
export class PaymentResolver {
  @Query(() => [Payment])
  payments(): Promise<Payment[]> {
    return PaymentService.all();
  }

  @Mutation(() => Payment)
  async createPayment(@Arg('data') data: PaymentInput) {
    return PaymentService.create(data);
  }
}
