import { HourlyClassification } from './hourly-classification';
import { PaymentClassification } from '../domain/payment-classification';
import { PaymentScheduler } from '../domain/payment-scheduler';
import { WeeklyScheduler } from '../schedule/weekly-scheduler';
import { ChangeEmployeeClassificationTransaction } from './change-employee-classification-transaction';
import { ERepository } from 'src/payroll-database/e-repository';

export class ChangeEmployeeToHourlyClassificationTransaction extends ChangeEmployeeClassificationTransaction {
  constructor(
    id: string,
    employeeRepository: ERepository,
    private hourlyRate: number,
  ) {
    super(id, employeeRepository);
  }
  protected getScheduler(): PaymentScheduler {
    return new WeeklyScheduler();
  }
  protected getClassification(): PaymentClassification {
    return new HourlyClassification(this.hourlyRate);
  }
}
