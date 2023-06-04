import { Employee } from '../payroll-domain/employee';
import { PaymentClassification } from '../payroll-domain/payment-classification';
import { PaymentScheduler } from '../payroll-domain/payment-scheduler';
import { ChangeEmployeeTransaction } from './change-employee-transaction';
import { ERepository } from '../payroll-repository/e-repository';

export abstract class ChangeEmployeeClassificationTransaction extends ChangeEmployeeTransaction {
  constructor(id: string, employeeRepository: ERepository) {
    super(id, employeeRepository);
  }
  protected abstract getScheduler(): PaymentScheduler;
  protected abstract getClassification(): PaymentClassification;

  protected change(employee: Employee): void {
    employee.setPaymentScheduler(this.getScheduler());
    employee.setPaymentClassification(this.getClassification());
  }
}
