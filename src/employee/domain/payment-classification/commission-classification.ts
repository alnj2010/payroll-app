import { PaymentClassification } from '.';
import { SaleReceipt } from '../sale-receipt';

export class CommissionClassification extends PaymentClassification {
  private salesReceipt: SaleReceipt[] = [];
  constructor(private salary: number, private commissionRate: number) {
    super();
  }

  getSalesReceipt(): SaleReceipt[] {
    return this.salesReceipt;
  }

  addSaleReceipt(saleReceipt: SaleReceipt) {
    this.salesReceipt.push(saleReceipt);
  }
}
