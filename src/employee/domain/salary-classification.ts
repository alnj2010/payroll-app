import { PaymentClassification } from './payment-classification';

export class SalaryClassification extends PaymentClassification {
  constructor(private salary: number) {
    super();
  }

  public getSalary() {
    return this.salary;
  }
}
