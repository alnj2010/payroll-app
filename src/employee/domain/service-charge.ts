export class ServiceCharge {
  constructor(private id: string, private amount: number) {}

  public getId(): string {
    return this.id;
  }

  public getAmount(): number {
    return this.amount;
  }
}
