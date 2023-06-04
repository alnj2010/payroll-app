import { Paycheck } from '../payroll-domain/paycheck';
import { Method, PaymentMethod } from '../payroll-domain/payment-method';

export class DirectMethod extends PaymentMethod {
  sendPaycheck(paycheck: Paycheck) {
    return [paycheck, this.bank, this.account];
  }
  constructor(private bank: string, private account: string) {
    super(Method.DIRECT);
  }
  public getBank(): string {
    return this.bank;
  }

  public getAccount(): string {
    return this.account;
  }
}
