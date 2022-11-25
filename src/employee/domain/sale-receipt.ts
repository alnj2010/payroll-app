export class SaleReceipt {
  constructor(private date: Date, private amount: number) {}

  getDate(): Date {
    return this.date;
  }

  getAmount(): number {
    return this.amount;
  }
}
