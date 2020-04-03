import { Resolver, Query, Mutation, Arg } from 'type-graphql';

import { RecurringPayment } from './entity';
import { RecurringPaymentService } from './service';
import { RecurringPaymentInput } from './input';

@Resolver()
export class RecurringPaymentResolver {
  constructor(private readonly recurringPaymentService: RecurringPaymentService) {}

  @Query(() => [RecurringPayment])
  recurringPayments(): Promise<RecurringPayment[]> {
    return this.recurringPaymentService.all();
  }

  @Mutation(() => RecurringPayment)
  async createRecurringPayment(
    @Arg('recurringPayment') recurringPayment: RecurringPaymentInput,
  ): Promise<RecurringPayment> {
    return this.recurringPaymentService.create(recurringPayment);
  }
}
