import { Affiliation } from './affiliation';
import { Paycheck } from './paycheck';
import { ServiceCharge } from './service-charge';

export class UnionAffiliation implements Affiliation {
  private serviceCharges = new Map<string, ServiceCharge>();

  constructor(private memberId: string, private dueRate: number) {}

  calculateDeduction(paycheck: Paycheck): number {
    const deductionByDueRates = this.calculateDeductionByDueRates(paycheck);
    const deductionByServiceCharges =
      this.calculateDeductionByServiceCharges(paycheck);
    return deductionByDueRates + deductionByServiceCharges;
  }

  private calculateDeductionByServiceCharges(paycheck: Paycheck): number {
    const serviceCharges = Array.from(
      this.serviceCharges,
      ([, value]) => value,
    );

    const sum = serviceCharges.reduce((accumulator, currentValue) => {
      if (!this.isInPayPeriod(paycheck, currentValue)) {
        return accumulator;
      }
      const amount = currentValue.getAmount();

      return accumulator + amount;
    }, 0);

    return sum;
  }

  private isInPayPeriod(
    paycheck: Paycheck,
    serviceChage: ServiceCharge,
  ): boolean {
    const payPayPeriodStartDate = parseInt(paycheck.getPayPeriodStartDate());
    const payPeriodEndDate = parseInt(paycheck.getPayPeriodEndDate());
    const serviceChageDate = parseInt(serviceChage.getDate());

    return (
      payPayPeriodStartDate <= serviceChageDate &&
      payPeriodEndDate >= serviceChageDate
    );
  }

  private calculateDeductionByDueRates(paycheck: Paycheck): number {
    const periodStartDate = new Date(
      parseInt(paycheck.getPayPeriodStartDate()),
    );
    const periodEndDate = new Date(parseInt(paycheck.getPayPeriodEndDate()));

    const fridays = this.getTotalFridaysBetween(periodStartDate, periodEndDate);
    return fridays * this.dueRate;
  }

  public getMemberId(): string {
    return this.memberId;
  }

  public getDueRate(): number {
    return this.dueRate;
  }

  public addServiceCharge(serviceCharge: ServiceCharge): void {
    this.serviceCharges.set(serviceCharge.getDate(), serviceCharge);
  }

  public getServiceCharge(id: string): ServiceCharge {
    return this.serviceCharges.get(id);
  }
  private getTotalFridaysBetween(periodStartDate: Date, periodEndDate: Date) {
    let fridays = 0;
    const actualDate = periodStartDate;
    while (actualDate <= periodEndDate) {
      if (actualDate.getDay() === 5) {
        fridays++;
      }
      actualDate.setDate(actualDate.getDate() + 1);
    }
    return fridays;
  }
}
