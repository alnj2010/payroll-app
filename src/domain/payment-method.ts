import { Paycheck } from './paycheck';

export enum Method {
  HOLD = 'HOLD',
  DIRECT = 'DIRECT',
  MAIL = 'MAIL',
}

export abstract class PaymentMethod {
  constructor(private disposition: Method) {}

  getDisposition() {
    return this.disposition;
  }

  abstract sendPaycheck(paycheck: Paycheck);
}
