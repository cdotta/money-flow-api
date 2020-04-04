import { Resolver, Query, Arg } from 'type-graphql';
import { VirtualPaymentService } from './service';
import { VirtualPayment } from './dto';
import { VirtualPaymentFilterInput } from './input';

@Resolver()
export class VirtualPaymentResolver {
  constructor(private readonly virtualPaymentService: VirtualPaymentService) {}

  @Query(() => [VirtualPayment])
  async virtualPayments(@Arg('filter') filter: VirtualPaymentFilterInput): Promise<VirtualPayment[]> {
    const virtualPayments = await this.virtualPaymentService.all(filter);
    return virtualPayments;
  }
}
