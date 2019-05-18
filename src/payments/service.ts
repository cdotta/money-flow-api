import { getRepository, Repository } from 'typeorm';
import { Service } from 'typedi';
import { Payment } from './entity';
import { PaymentInput } from './input';

@Service()
export class PaymentService {
  private repository: Repository<Payment>;

  constructor() {
    console.log('new Payment Service');
    this.repository = getRepository(Payment);
  }

  create(data: PaymentInput): Promise<Payment> {
    const payment = new Payment(data);
    return this.repository.save(payment);
  }
  all(): Promise<Payment[]> {
    return this.repository.find();
  }
}
