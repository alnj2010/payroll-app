export class SaleReceipt {
  constructor(private date: string, private amount: number) {}

  public getDate(): string {
    return this.date;
  }

  public getAmount(): number {
    return this.amount;
  }
}
