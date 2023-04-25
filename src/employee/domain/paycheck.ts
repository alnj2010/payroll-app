export class Paycheck {
  private disposition: string;
  private grossPay: number;
  private deduction: number;
  private netPay: number;
  constructor(
    private payPeriodEndDate: string,
    private payPeriodStartDate: string,
  ) {}

  public getPayPeriodEndDate(): string {
    return this.payPeriodEndDate;
  }

  public getPayPeriodStartDate(): string {
    return this.payPeriodStartDate;
  }

  public getDisposition(): string {
    return this.disposition;
  }

  public getGrossPay(): number {
    return this.grossPay;
  }

  public getDeduction(): number {
    return this.deduction;
  }

  public getNetPay(): number {
    return this.netPay;
  }

  public setDisposition(disposition: string): void {
    this.disposition = disposition;
  }

  public setGrossPay(grossPay: number): void {
    this.grossPay = grossPay;
  }

  public setDeduction(deduction: number): void {
    this.deduction = deduction;
  }

  public setNetPay(netPay: number): void {
    this.netPay = netPay;
  }
}
