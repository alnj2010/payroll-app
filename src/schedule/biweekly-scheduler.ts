import { DateUtil } from '../domain/date.util';
import { PaymentScheduler } from '../domain/payment-scheduler';

export class BiweeklyScheduler implements PaymentScheduler {
  calculatePayPeriodStartDate(timestamp: string): string {
    const date = new DateUtil(timestamp);
    if (date.isMiddleOfTheMonth()) {
      return date.getFirstDayOfTheMonth();
    }
    return date.get16DayOfTheMonth();
  }
  public isPayDay(timestamp: string): boolean {
    const date = new DateUtil(timestamp);
    return date.isLastDayOfMonth() || date.isMiddleOfTheMonth();
  }
}
