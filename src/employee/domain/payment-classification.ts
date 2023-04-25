import { Paycheck } from './paycheck';

export interface PaymentClassification {
  calculatePay(paycheck: Paycheck): number;
}
