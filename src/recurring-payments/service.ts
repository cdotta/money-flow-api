import { Connection, Repository } from 'typeorm';
import { Service } from 'typedi';
import { plainToClass } from 'class-transformer';

import { RecurringPayment } from './entity';
import { RecurringPaymentInput } from './input';

@Service()
export class RecurringPaymentService {
  private repository: Repository<RecurringPayment>;

  constructor(private readonly connection: Connection) {
    this.repository = this.connection.getRepository(RecurringPayment);
  }

  all(): Promise<RecurringPayment[]> {
    return this.repository.find();
  }

  async create(recurringPaymentInput: RecurringPaymentInput): Promise<RecurringPayment> {
    const recurringPayment = plainToClass(RecurringPayment, recurringPaymentInput);
    await this.repository.save(recurringPayment);
    return recurringPayment;
  }
}
