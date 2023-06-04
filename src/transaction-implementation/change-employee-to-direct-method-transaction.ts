import { PaymentMethod } from '../payroll-domain/payment-method';
import { ChangeEmployeeMethodTransaction } from '../abstract-transaction/change-employee-method-transaction';
import { ERepository } from '../payroll-repository/e-repository';
import { PayrollFactory } from '../payroll-factory/payroll-factory';

export class ChangeEmployeeToDirectMethodTransaction extends ChangeEmployeeMethodTransaction {
  constructor(
    id: string,
    employeeRepository: ERepository,
    private payrollFactoryImplementation: PayrollFactory,
    private bank: string,
    private account: string,
  ) {
    super(id, employeeRepository);
  }
  protected getMethod(): PaymentMethod {
    return this.payrollFactoryImplementation.makeDirectMethod(
      this.bank,
      this.account,
    );
  }
}
