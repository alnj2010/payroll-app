import { Employee } from '../domain/employee';
import { PaymentMethod } from '../domain/payment-method';
import { ChangeEmployeeTransaction } from './change-employee-transaction';

export abstract class ChangeEmployeeMethodTransaction extends ChangeEmployeeTransaction {
  constructor(id: string) {
    super(id);
  }
  protected abstract getMethod(): PaymentMethod;

  protected change(employee: Employee): void {
    employee.setPaymentMethod(this.getMethod());
  }
}
