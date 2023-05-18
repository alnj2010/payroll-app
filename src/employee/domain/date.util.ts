export class DateUtil {
  private date: Date;
  constructor(timestamp: string) {
    this.date = new Date(parseInt(timestamp));
  }

  isLastDayOfMonth() {
    const month = this.date.getMonth();

    const date = new Date(this.date);
    date.setDate(date.getDate() + 1);
    return date.getMonth() !== month;
  }

  isFriday() {
    return this.date.getDay() === 5;
  }

  isMiddleOfTheMonth() {
    return this.date.getDate() === 15;
  }

  getFirstDayOfTheMonth(): string {
    const date = new Date(this.date);
    date.setDate(1);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    return '' + date.getTime();
  }

  get16DayOfTheMonth(): string {
    const date = new Date(this.date);
    date.setDate(16);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    return '' + date.getTime();
  }

  getPastMondayDay(): string {
    const date = new Date(this.date);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    return date.setDate(this.date.getDate() - 4).toString();
  }
}
