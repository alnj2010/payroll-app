import { CommissionClassification } from './commission-classification';
import { PaymentClassification } from '../domain/payment-classification';
import { PaymentScheduler } from '../domain/payment-scheduler';
import { BiweeklyScheduler } from '../schedule/biweekly-scheduler';
import { ChangeEmployeeClassificationTransaction } from './change-employee-classification-transaction';
import { ERepository } from 'src/payroll-database/e-repository';

export class ChangeEmployeeToCommissionClassificationTransaction extends ChangeEmployeeClassificationTransaction {
  constructor(
    id: string,
    employeeRepository: ERepository,
    private salary: number,
    private commissionRate: number,
  ) {
    super(id, employeeRepository);
  }
  protected getScheduler(): PaymentScheduler {
    return new BiweeklyScheduler();
  }
  protected getClassification(): PaymentClassification {
    return new CommissionClassification(this.salary, this.commissionRate);
  }
}
