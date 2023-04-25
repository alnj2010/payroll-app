import { Paycheck } from './paycheck';
import { PaymentClassification } from './payment-classification';
import { SaleReceipt } from './sale-receipt';

export class CommissionClassification implements PaymentClassification {
  private saleReceipts = new Map<string, SaleReceipt>();

  calculatePay(paycheck: Paycheck): number {
    return 0;
  }

  constructor(private salary: number, private commissionRate: number) {}

  public getCommissionRate(): number {
    return this.commissionRate;
  }

  public getSalary(): number {
    return this.salary;
  }

  public addSaleReceipt(saleReceipt: SaleReceipt): void {
    this.saleReceipts.set(saleReceipt.getDate(), saleReceipt);
  }

  public getSaleReceipt(date: string): SaleReceipt {
    return this.saleReceipts.get(date);
  }
}
