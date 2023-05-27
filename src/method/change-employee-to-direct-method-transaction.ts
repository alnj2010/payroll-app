import { DirectMethod } from './direct-method';
import { PaymentMethod } from '../domain/payment-method';
import { ChangeEmployeeMethodTransaction } from './change-employee-method-transaction';
import { ERepository } from 'src/payroll-database/e-repository';

export class ChangeEmployeeToDirectMethodTransaction extends ChangeEmployeeMethodTransaction {
  constructor(
    id: string,
    employeeRepository: ERepository,
    private bank: string,
    private account: string,
  ) {
    super(id, employeeRepository);
  }
  protected getMethod(): PaymentMethod {
    return new DirectMethod(this.bank, this.account);
  }
}
