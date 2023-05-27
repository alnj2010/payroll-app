import { DateUtil } from '../domain/date.util';
import { PaymentScheduler } from '../domain/payment-scheduler';

export class MonthlyScheduler implements PaymentScheduler {
  calculatePayPeriodStartDate(timestamp: string): string {
    const date = new DateUtil(timestamp);
    return date.getFirstDayOfTheMonth();
  }

  public isPayDay(timestamp: string): boolean {
    const date = new DateUtil(timestamp);
    return date.isLastDayOfMonth();
  }
}
