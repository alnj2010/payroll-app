export class TimeCard {
  constructor(private date: Date, private hours: number) {}

  getDate(): Date {
    return this.date;
  }

  getHours(): number {
    return this.hours;
  }
}
