import { HourlyClassification } from '../domain/hourly-classification';
import { PaymentClassification } from '../domain/payment-classification';
import { PaymentScheduler } from '../domain/payment-scheduler';
import { WeeklyScheduler } from '../domain/weekly-scheduler';
import { ChangeEmployeePaymentTransaction } from './change-employee-payment-transaction';

export class ChangeEmployeeToHourlyPaymentTransaction extends ChangeEmployeePaymentTransaction {
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
