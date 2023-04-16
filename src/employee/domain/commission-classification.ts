import { PaymentClassification } from './payment-classification';
import { SaleReceipt } from './sale-receipt';

export class CommissionClassification extends PaymentClassification {
  private saleReceipts = new Map<string, SaleReceipt>();

  constructor(private salary: number, private commissionRate: number) {
    super();
  }

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
