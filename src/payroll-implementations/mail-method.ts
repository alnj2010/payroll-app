import { Paycheck } from '../payroll-domain/paycheck';
import { Method, PaymentMethod } from '../payroll-domain/payment-method';

export class MailMethod extends PaymentMethod {
  constructor(private mail: string) {
    super(Method.MAIL);
  }
  public getMail(): string {
    return this.mail;
  }
  sendPaycheck(paycheck: Paycheck) {
    return [paycheck, this.mail];
  }
}
