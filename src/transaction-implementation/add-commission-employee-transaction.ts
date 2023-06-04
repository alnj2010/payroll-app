import { AddEmployeeTransaction } from '../abstract-transaction/add-employee-transaction';
import { PaymentClassification } from '../payroll-domain/payment-classification';
import { PaymentScheduler } from '../payroll-domain/payment-scheduler';
import { PaymentMethod } from '../payroll-domain/payment-method';
import { ERepository } from '../payroll-repository/e-repository';
import { PayrollFactory } from '../payroll-factory/payroll-factory';

export class AddCommissionEmployeeTransaction extends AddEmployeeTransaction {
  constructor(
    id: string,
    name: string,
    address: string,
    employeeRepository: ERepository,
    payrollFactoryImplementation: PayrollFactory,

    private salary: number,
    private commissionRate: number,
  ) {
    super(id, name, address, employeeRepository, payrollFactoryImplementation);
  }

  protected createPaymentClassification(): PaymentClassification {
    return this.payrollFactoryImplementation.makeCommissionClassification(
      this.salary,
      this.commissionRate,
    );
  }

  protected createPaymentScheduler(): PaymentScheduler {
    return this.payrollFactoryImplementation.makeBiweeklyScheduler();
  }

  protected createPaymentMethod(): PaymentMethod {
    return this.payrollFactoryImplementation.makeHoldMethod();
  }
}
