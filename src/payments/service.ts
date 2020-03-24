import { Connection, Repository, MoreThanOrEqual, LessThanOrEqual } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { Service } from 'typedi';

import { Payment } from './entity';
import { PaymentInput, PaymentUpdateInput, PaymentFilterInput } from './input';

@Service()
export class PaymentService {
  private repository: Repository<Payment>;

  constructor(private readonly connection: Connection) {
    this.repository = this.connection.getRepository(Payment);
  }

  create(data: PaymentInput): Promise<Payment> {
    const payment: Payment = plainToClass(Payment, data);
    return this.repository.save(payment);
  }

  async update(id: string, data: PaymentUpdateInput) {
    const payment = await this.repository.findOne(id);
    if (!payment) {
      throw new Error('not_found');
    }
    const newPayment: Payment = plainToClass(Payment, { ...payment, ...data });
    return this.repository.save(newPayment);
  }

  all(filter: PaymentFilterInput = {}): Promise<Payment[]> {
    let queryBuilder = this.repository.createQueryBuilder('payment');
    if (filter.hasOwnProperty('pending')) {
      queryBuilder = queryBuilder.andWhere('pending = :pending', { pending: filter.pending });
    }
    if (filter.hasOwnProperty('fromDueMonth')) {
      queryBuilder = queryBuilder.andWhere('due_month >= :fromDueMonth', {
        fromDueMonth: filter.fromDueMonth,
      });
    }
    if (filter.hasOwnProperty('toDueMonth')) {
      queryBuilder = queryBuilder.andWhere('due_month <= :toDueMonth', {
        toDueMonth: filter.toDueMonth,
      });
    }
    if (filter.hasOwnProperty('fromDueYear')) {
      queryBuilder = queryBuilder.andWhere('due_year >= :fromDueYear', {
        fromDueYear: filter.fromDueYear,
      });
    }
    if (filter.hasOwnProperty('toDueYear')) {
      queryBuilder = queryBuilder.andWhere('due_year <= :toDueYear', {
        toDueYear: filter.toDueYear,
      });
    }
    return queryBuilder.getMany();
  }
}
