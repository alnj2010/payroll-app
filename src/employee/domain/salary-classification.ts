import { Paycheck } from './paycheck';
import { PaymentClassification } from './payment-classification';

export class SalaryClassification implements PaymentClassification {
  constructor(private salary: number) {}

  calculatePay(paycheck: Paycheck): number {
    return 0;
  }
  public getSalary() {
    return this.salary;
  }
}
