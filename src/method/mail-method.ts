import { Paycheck } from '../domain/paycheck';
import { Method, PaymentMethod } from '../domain/payment-method';

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
