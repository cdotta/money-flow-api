import { getConnection, getRepository } from 'typeorm';
import { Payment } from './entity';
import { PaymentInput } from './input';

export class PaymentService {
  static create(data: PaymentInput): Promise<Payment> {
    const repo = getRepository(Payment);
    const payment = new Payment(data);
    return repo.save(payment);
  }
  static all(): Promise<Payment[]> {
    const repo = getRepository(Payment);
    return repo.find();
  }
}
