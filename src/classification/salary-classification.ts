import { Paycheck } from '../domain/paycheck';
import { PaymentClassification } from '../domain/payment-classification';

export class SalaryClassification implements PaymentClassification {
  constructor(private salary: number) {}

  calculatePay(paycheck: Paycheck): number {
    return this.salary;
  }
  public getSalary() {
    return this.salary;
  }
}
