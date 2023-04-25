import { PaymentScheduler } from './payment-scheduler';

export class WeeklyScheduler implements PaymentScheduler {
  public isPayDay(timestamp: string): boolean {
    const date = new Date(parseInt(timestamp));
    return date.getDay() === 5;
  }

  public calculatePayPeriodStartDate(timestamp: string): string {
    const date = new Date(parseInt(timestamp));
    return date.setDate(date.getDate() - 4).toString();
  }
}
