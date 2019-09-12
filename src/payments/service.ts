import { Connection, Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { Service } from 'typedi';

import { Payment } from './entity';
import { PaymentInput, PaymentUpdateInput } from './input';

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

  all(): Promise<Payment[]> {
    return this.repository.find();
  }
}
