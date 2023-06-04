import { Paycheck } from '../payroll-domain/paycheck';
import { PaymentClassification } from '../payroll-domain/payment-classification';

export class SalaryClassification implements PaymentClassification {
  constructor(private salary: number) {}

  calculatePay(paycheck: Paycheck): number {
    return this.salary;
  }
  public getSalary() {
    return this.salary;
  }
}
