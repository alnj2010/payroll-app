import { Paycheck } from '../domain/paycheck';
import { PaymentClassification } from '../domain/payment-classification';
import { SaleReceipt } from './sale-receipt';

export class CommissionClassification implements PaymentClassification {
  private saleReceipts = new Map<string, SaleReceipt>();

  constructor(private salary: number, private commissionRate: number) {}

  calculatePay(paycheck: Paycheck): number {
    const saleReceipts = Array.from(this.saleReceipts, ([, value]) => value);
    const commisionSum = saleReceipts.reduce((accumulator, currentValue) => {
      if (!this.isInPayPeriod(paycheck, currentValue)) {
        return accumulator;
      }
      const amount = currentValue.getAmount();
      const commision = this.commissionRate * amount;

      return accumulator + commision;
    }, 0);
    return commisionSum + this.salary;
  }

  private isInPayPeriod(paycheck: Paycheck, saleReceipt: SaleReceipt): boolean {
    const payPayPeriodStartDate = parseInt(paycheck.getPayPeriodStartDate());
    const payPeriodEndDate = parseInt(paycheck.getPayPeriodEndDate());
    const timeCardDate = parseInt(saleReceipt.getDate());

    return (
      payPayPeriodStartDate <= timeCardDate && payPeriodEndDate >= timeCardDate
    );
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
