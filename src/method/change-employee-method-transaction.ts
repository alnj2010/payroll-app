import { Employee } from '../domain/employee';
import { PaymentMethod } from '../domain/payment-method';
import { ChangeEmployeeTransaction } from '../change-employee-transaction/change-employee-transaction';
import { ERepository } from 'src/payroll-database/e-repository';

export abstract class ChangeEmployeeMethodTransaction extends ChangeEmployeeTransaction {
  constructor(id: string, employeeRepository: ERepository) {
    super(id, employeeRepository);
  }
  protected abstract getMethod(): PaymentMethod;

  protected change(employee: Employee): void {
    employee.setPaymentMethod(this.getMethod());
  }
}
