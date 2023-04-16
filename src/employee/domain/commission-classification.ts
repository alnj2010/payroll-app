import { PaymentClassification } from './payment-classification';

export class CommissionClassification extends PaymentClassification {
  constructor(private salary: number, private commissionRate: number) {
    super();
  }

  public getCommissionRate(): number {
    return this.commissionRate;
  }

  public getSalary(): number {
    return this.salary;
  }
}
