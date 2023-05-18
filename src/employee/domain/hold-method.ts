import { Paycheck } from './paycheck';
import { Method, PaymentMethod } from './payment-method';

export class HoldMethod extends PaymentMethod {
  constructor() {
    super(Method.HOLD);
  }
  sendPaycheck(paycheck: Paycheck) {
    return paycheck;
  }
}
