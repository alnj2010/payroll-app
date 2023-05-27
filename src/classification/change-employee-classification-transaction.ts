import { Employee } from '../domain/employee';
import { PaymentClassification } from '../domain/payment-classification';
import { PaymentScheduler } from '../domain/payment-scheduler';
import { ChangeEmployeeTransaction } from '../change-employee-transaction/change-employee-transaction';

export abstract class ChangeEmployeeClassificationTransaction extends ChangeEmployeeTransaction {
  constructor(id: string) {
    super(id);
  }
  protected abstract getScheduler(): PaymentScheduler;
  protected abstract getClassification(): PaymentClassification;

  protected change(employee: Employee): void {
    employee.setPaymentScheduler(this.getScheduler());
    employee.setPaymentClassification(this.getClassification());
  }
}
