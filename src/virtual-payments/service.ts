import { Connection, Repository, IsNull, Not, In } from 'typeorm';
import { Service } from 'typedi';
import { v4 } from 'uuid';

import { RecurringPayment } from '../recurring-payments/entity';
import { Payment } from '../payments/entity';
import { VirtualPaymentFilterInput } from './input';
import { VirtualPayment } from './dto';

@Service()
export class VirtualPaymentService {
  private recurringPaymentRepository: Repository<RecurringPayment>;
  private paymentRepository: Repository<Payment>;

  constructor(private readonly connection: Connection) {
    this.recurringPaymentRepository = this.connection.getRepository(RecurringPayment);
    this.paymentRepository = this.connection.getRepository(Payment);
  }

  async all({ dueMonth, dueYear }: VirtualPaymentFilterInput): Promise<VirtualPayment[]> {
    const materializedRecurringPaymentIds = await this.paymentRepository
      .createQueryBuilder('payment')
      .where({ dueYear, dueMonth, recurringPaymentId: Not(IsNull()) })
      .select('distinct payment.recurring_payment_id')
      .getRawMany()
      .then(result => result.map(({ recurring_payment_id: id }) => id));

    const virtualRecurringPayments = await this.recurringPaymentRepository.find({
      where: { id: Not(In(materializedRecurringPaymentIds)) },
    });

    return virtualRecurringPayments.map(recurringPayment => ({
      id: v4(),
      description: recurringPayment.description,
      amount: recurringPayment.defaultAmount,
      recurringPaymentId: recurringPayment.id,
      pending: true,
      dueMonth,
      dueYear,
    }));
  }
}
