import { Paycheck } from '../domain/paycheck';
import { Method, PaymentMethod } from '../domain/payment-method';

export class HoldMethod extends PaymentMethod {
  constructor() {
    super(Method.HOLD);
  }
  sendPaycheck(paycheck: Paycheck) {
    return paycheck;
  }
}
