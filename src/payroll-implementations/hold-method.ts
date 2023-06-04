import { Paycheck } from '../payroll-domain/paycheck';
import { Method, PaymentMethod } from '../payroll-domain/payment-method';

export class HoldMethod extends PaymentMethod {
  constructor() {
    super(Method.HOLD);
  }
  sendPaycheck(paycheck: Paycheck) {
    return paycheck;
  }
}
