import { Resolver, Query, Arg, Mutation, ID } from 'type-graphql';
import { VirtualPaymentService } from './service';
import { VirtualPayment } from './dto';
import { VirtualPaymentFilterInput, MaterializePaymentInput } from './input';
import { Payment } from '../payments/entity';

@Resolver()
export class VirtualPaymentResolver {
  constructor(private readonly virtualPaymentService: VirtualPaymentService) {}

  @Query(() => [VirtualPayment])
  async virtualPayments(
    @Arg('filter') filter: VirtualPaymentFilterInput,
  ): Promise<VirtualPayment[]> {
    const virtualPayments = await this.virtualPaymentService.all(filter);
    return virtualPayments;
  }

  @Mutation(() => Payment)
  materializePayment(
    @Arg('recurringPaymentId', () => ID) recurringPaymentId: number,
    @Arg('data') data: MaterializePaymentInput,
  ) {
    return this.virtualPaymentService.materializePayment(recurringPaymentId, data);
  }

  @Mutation(() => [Payment])
  materializePayments(
    @Arg('recurringPaymentIds', () => [ID]) recurringPaymentIds: number[],
    @Arg('data') data: MaterializePaymentInput,
  ) {
    return this.virtualPaymentService.materializePayments(recurringPaymentIds, data);
  }
}
