import { HoldMethod } from '../domain/hold-method';
import { AddEmployeeTransaction } from './add-employee';
import { CommissionClassification } from '../domain/commission-classification';
import { BiweeklyScheduler } from '../domain/biweekly-scheduler';

export class AddCommissionEmployeeTransaction extends AddEmployeeTransaction {
  constructor(
    id: string,
    name: string,
    address: string,
    private salary: number,
    private commissionRate: number,
  ) {
    super(id, name, address);
  }

  protected createPaymentClassification() {
    return new CommissionClassification(this.salary, this.commissionRate);
  }

  protected createPaymentScheduler() {
    return new BiweeklyScheduler();
  }

  protected createPaymentMethod() {
    return new HoldMethod();
  }
}
