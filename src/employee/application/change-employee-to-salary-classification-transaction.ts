import { SalaryClassification } from '../domain/salary-classification';
import { PaymentClassification } from '../domain/payment-classification';
import { PaymentScheduler } from '../domain/payment-scheduler';
import { MonthlyScheduler } from '../domain/monthly-scheduler';
import { ChangeEmployeeClassificationTransaction } from './change-employee-classification-transaction';

export class ChangeEmployeeToSalaryClassificationTransaction extends ChangeEmployeeClassificationTransaction {
  constructor(id: string, private salary: number) {
    super(id);
  }
  protected getScheduler(): PaymentScheduler {
    return new MonthlyScheduler();
  }
  protected getClassification(): PaymentClassification {
    return new SalaryClassification(this.salary);
  }
}
