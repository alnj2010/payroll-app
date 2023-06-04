import { AddEmployeeTransaction } from '../abstract-transaction/add-employee-transaction';
import { PaymentClassification } from '../payroll-domain/payment-classification';
import { PaymentScheduler } from '../payroll-domain/payment-scheduler';
import { PaymentMethod } from '../payroll-domain/payment-method';
import { ERepository } from '../payroll-repository/e-repository';
import { PayrollFactory } from '../payroll-factory/payroll-factory';

export class AddSalaryEmployeeTransaction extends AddEmployeeTransaction {
  constructor(
    id: string,
    name: string,
    address: string,
    employeeRepository: ERepository,
    payrollFactoryImplementation: PayrollFactory,

    private salary: number,
  ) {
    super(id, name, address, employeeRepository, payrollFactoryImplementation);
  }

  protected createPaymentClassification(): PaymentClassification {
    return this.payrollFactoryImplementation.makeSalaryClassification(
      this.salary,
    );
  }

  protected createPaymentScheduler(): PaymentScheduler {
    return this.payrollFactoryImplementation.makeMonthlyScheduler();
  }

  protected createPaymentMethod(): PaymentMethod {
    return this.payrollFactoryImplementation.makeHoldMethod();
  }
}
