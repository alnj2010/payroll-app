import { Employee } from '../payroll-domain/employee';
import { PaymentMethod } from '../payroll-domain/payment-method';
import { ChangeEmployeeTransaction } from './change-employee-transaction';
import { ERepository } from '../payroll-repository/e-repository';

export abstract class ChangeEmployeeMethodTransaction extends ChangeEmployeeTransaction {
  constructor(id: string, employeeRepository: ERepository) {
    super(id, employeeRepository);
  }
  protected abstract getMethod(): PaymentMethod;

  protected change(employee: Employee): void {
    employee.setPaymentMethod(this.getMethod());
  }
}
