import { HoldMethod } from '../method/hold-method';
import { HourlyClassification } from './hourly-classification';
import { AddEmployeeTransaction } from './add-employee-transaction';
import { WeeklyScheduler } from '../schedule/weekly-scheduler';
import { PaymentClassification } from '../domain/payment-classification';
import { PaymentScheduler } from '../domain/payment-scheduler';
import { PaymentMethod } from '../domain/payment-method';
import { ERepository } from 'src/payroll-database/e-repository';

export class AddHourlyEmployeeTransaction extends AddEmployeeTransaction {
  constructor(
    id: string,
    name: string,
    address: string,
    employeeRepository: ERepository,
    private hourlyRate: number,
  ) {
    super(id, name, address, employeeRepository);
  }

  protected createPaymentClassification(): PaymentClassification {
    return new HourlyClassification(this.hourlyRate);
  }

  protected createPaymentScheduler(): PaymentScheduler {
    return new WeeklyScheduler();
  }

  protected createPaymentMethod(): PaymentMethod {
    return new HoldMethod();
  }
}
