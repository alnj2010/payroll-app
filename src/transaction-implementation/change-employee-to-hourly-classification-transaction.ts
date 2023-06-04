import { PaymentClassification } from '../payroll-domain/payment-classification';
import { PaymentScheduler } from '../payroll-domain/payment-scheduler';
import { ChangeEmployeeClassificationTransaction } from '../abstract-transaction/change-employee-classification-transaction';
import { ERepository } from '../payroll-repository/e-repository';
import { PayrollFactory } from '../payroll-factory/payroll-factory';

export class ChangeEmployeeToHourlyClassificationTransaction extends ChangeEmployeeClassificationTransaction {
  constructor(
    id: string,
    employeeRepository: ERepository,
    private payrollFactoryImplementation: PayrollFactory,
    private hourlyRate: number,
  ) {
    super(id, employeeRepository);
  }
  protected getScheduler(): PaymentScheduler {
    return this.payrollFactoryImplementation.makeWeeklyScheduler();
  }
  protected getClassification(): PaymentClassification {
    return this.payrollFactoryImplementation.makeHourlyClassification(
      this.hourlyRate,
    );
  }
}
