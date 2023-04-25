export interface PaymentScheduler {
  isPayDay(timestamp: string): boolean;
  calculatePayPeriodStartDate(timestamp: string): string;
}
