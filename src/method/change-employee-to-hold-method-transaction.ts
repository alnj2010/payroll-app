import { HoldMethod } from './hold-method';
import { PaymentMethod } from '../domain/payment-method';
import { ChangeEmployeeMethodTransaction } from './change-employee-method-transaction';
import { ERepository } from 'src/payroll-database/e-repository';

export class ChangeEmployeeToHoldMethodTransaction extends ChangeEmployeeMethodTransaction {
  constructor(id: string, employeeRepository: ERepository) {
    super(id, employeeRepository);
  }
  protected getMethod(): PaymentMethod {
    return new HoldMethod();
  }
}
