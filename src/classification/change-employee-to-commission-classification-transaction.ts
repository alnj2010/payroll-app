import { CommissionClassification } from './commission-classification';
import { PaymentClassification } from '../domain/payment-classification';
import { PaymentScheduler } from '../domain/payment-scheduler';
import { BiweeklyScheduler } from '../schedule/biweekly-scheduler';
import { ChangeEmployeeClassificationTransaction } from './change-employee-classification-transaction';

export class ChangeEmployeeToCommissionClassificationTransaction extends ChangeEmployeeClassificationTransaction {
  constructor(
    id: string,
    private salary: number,
    private commissionRate: number,
  ) {
    super(id);
  }
  protected getScheduler(): PaymentScheduler {
    return new BiweeklyScheduler();
  }
  protected getClassification(): PaymentClassification {
    return new CommissionClassification(this.salary, this.commissionRate);
  }
}
