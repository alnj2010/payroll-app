import { MailMethod } from './mail-method';
import { PaymentMethod } from '../domain/payment-method';
import { ChangeEmployeeMethodTransaction } from './change-employee-method-transaction';

export class ChangeEmployeeToMailMethodTransaction extends ChangeEmployeeMethodTransaction {
  constructor(id: string, private mailAddress: string) {
    super(id);
  }
  protected getMethod(): PaymentMethod {
    return new MailMethod(this.mailAddress);
  }
}
