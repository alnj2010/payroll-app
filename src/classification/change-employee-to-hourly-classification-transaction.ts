import { HourlyClassification } from './hourly-classification';
import { PaymentClassification } from '../domain/payment-classification';
import { PaymentScheduler } from '../domain/payment-scheduler';
import { WeeklyScheduler } from '../schedule/weekly-scheduler';
import { ChangeEmployeeClassificationTransaction } from './change-employee-classification-transaction';

export class ChangeEmployeeToHourlyClassificationTransaction extends ChangeEmployeeClassificationTransaction {
  constructor(id: string, private hourlyRate: number) {
    super(id);
  }
  protected getScheduler(): PaymentScheduler {
    return new WeeklyScheduler();
  }
  protected getClassification(): PaymentClassification {
    return new HourlyClassification(this.hourlyRate);
  }
}
