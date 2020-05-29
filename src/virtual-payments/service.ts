import { Connection, Repository, IsNull, Not, In } from 'typeorm';
import { Service } from 'typedi';
import { v4 } from 'uuid';
import { plainToClass } from 'class-transformer';

import { RecurringPayment } from '../recurring-payments/entity';
import { Payment } from '../payments/entity';
import { VirtualPaymentFilterInput, MaterializePaymentInput } from './input';
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

    let conditions = {};

    if (materializedRecurringPaymentIds.length > 0) {
      conditions = {
        where: { id: Not(In(materializedRecurringPaymentIds)) },
      };
    }

    const virtualRecurringPayments = await this.recurringPaymentRepository.find(conditions);

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

  async materializePayment(
    recurringPaymentId: number,
    data: MaterializePaymentInput,
  ): Promise<Payment> {
    const recurringPayment = await this.recurringPaymentRepository.findOne(recurringPaymentId);

    if (!recurringPayment) {
      throw new Error('not_found');
    }

    const payment = plainToClass(Payment, {
      description: recurringPayment.description,
      amount: recurringPayment.defaultAmount,
      pending: true,
      recurringPaymentId: recurringPayment.id,
      ...data,
    });
    return this.paymentRepository.save(payment);
  }

  async materializePayments(
    recurringPaymentIds: number[],
    data: MaterializePaymentInput,
  ): Promise<Payment[]> {
    const recurringPayments = await this.recurringPaymentRepository.findByIds([
      ...recurringPaymentIds,
    ]);

    const payments = plainToClass(
      Payment,
      recurringPayments.map(recurringPayment => {
        return {
          description: recurringPayment.description,
          amount: recurringPayment.defaultAmount,
          pending: true,
          recurringPaymentId: recurringPayment.id,
          ...data,
        };
      }),
    );
    return this.paymentRepository.save(payments);
  }
}
