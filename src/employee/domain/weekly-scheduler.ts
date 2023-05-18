import { DateUtil } from './date.util';
import { PaymentScheduler } from './payment-scheduler';

export class WeeklyScheduler implements PaymentScheduler {
  public isPayDay(timestamp: string): boolean {
    const date = new DateUtil(timestamp);
    return date.isFriday();
  }

  public calculatePayPeriodStartDate(timestamp: string): string {
    const date = new DateUtil(timestamp);
    return date.getPastMondayDay();
  }
}
