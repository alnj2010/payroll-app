import { PaymentClassification } from '../payroll-domain/payment-classification';
import { PaymentScheduler } from '../payroll-domain/payment-scheduler';
import { ChangeEmployeeClassificationTransaction } from '../abstract-transaction/change-employee-classification-transaction';
import { ERepository } from '../payroll-repository/e-repository';
import { PayrollFactory } from '../payroll-factory/payroll-factory';

export class ChangeEmployeeToCommissionClassificationTransaction extends ChangeEmployeeClassificationTransaction {
  constructor(
    id: string,
    employeeRepository: ERepository,
    private payrollFactoryImplementation: PayrollFactory,
    private salary: number,
    private commissionRate: number,
  ) {
    super(id, employeeRepository);
  }
  protected getScheduler(): PaymentScheduler {
    return this.payrollFactoryImplementation.makeBiweeklyScheduler();
  }
  protected getClassification(): PaymentClassification {
    return this.payrollFactoryImplementation.makeCommissionClassification(
      this.salary,
      this.commissionRate,
    );
  }
}
