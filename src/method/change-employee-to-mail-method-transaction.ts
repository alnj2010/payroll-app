import { MailMethod } from './mail-method';
import { PaymentMethod } from '../domain/payment-method';
import { ChangeEmployeeMethodTransaction } from './change-employee-method-transaction';
import { ERepository } from 'src/payroll-database/e-repository';

export class ChangeEmployeeToMailMethodTransaction extends ChangeEmployeeMethodTransaction {
  constructor(
    id: string,
    employeeRepository: ERepository,
    private mailAddress: string,
  ) {
    super(id, employeeRepository);
  }
  protected getMethod(): PaymentMethod {
    return new MailMethod(this.mailAddress);
  }
}
