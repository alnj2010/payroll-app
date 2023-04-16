export class TimeCard {
  constructor(private date: string, private hours: number) {}

  public getDate(): string {
    return this.date;
  }

  public getHours(): number {
    return this.hours;
  }
}
