import { PaymentScheduler } from './payment-scheduler';

export class MonthlyScheduler implements PaymentScheduler {
  calculatePayPeriodStartDate(timestamp: string): string {
    throw new Error('Method not implemented.');
  }
  public isPayDay(date: string): boolean {
    return true;
  }
}
