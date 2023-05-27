import { DirectMethod } from './direct-method';
import { PaymentMethod } from '../domain/payment-method';
import { ChangeEmployeeMethodTransaction } from './change-employee-method-transaction';

export class ChangeEmployeeToDirectMethodTransaction extends ChangeEmployeeMethodTransaction {
  constructor(id: string, private bank: string, private account: string) {
    super(id);
  }
  protected getMethod(): PaymentMethod {
    return new DirectMethod(this.bank, this.account);
  }
}
