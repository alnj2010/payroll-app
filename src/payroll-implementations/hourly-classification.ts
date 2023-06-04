import { Paycheck } from '../payroll-domain/paycheck';
import { PaymentClassification } from '../payroll-domain/payment-classification';
import { TimeCard } from './time-card';
const WORKING_HOURS = 8;
const OVERTIME_RATE = 1.5;

export class HourlyClassification implements PaymentClassification {
  private timeCards = new Map<string, TimeCard>();
  constructor(private hourlyRate: number) {}

  calculatePay(paycheck: Paycheck): number {
    const timeCards = Array.from(this.timeCards, ([, value]) => value);

    const sum = timeCards.reduce((accumulator, currentValue) => {
      if (!this.isInPayPeriod(paycheck, currentValue)) {
        return accumulator;
      }
      const hours = currentValue.getHours();
      const overtime = Math.max(0, hours - WORKING_HOURS);
      const amount =
        this.hourlyRate * (hours - overtime + overtime * OVERTIME_RATE);

      return accumulator + amount;
    }, 0);

    return sum;
  }

  private isInPayPeriod(paycheck: Paycheck, timeCard: TimeCard): boolean {
    const payPayPeriodStartDate = parseInt(paycheck.getPayPeriodStartDate());
    const payPeriodEndDate = parseInt(paycheck.getPayPeriodEndDate());
    const timeCardDate = parseInt(timeCard.getDate());

    return (
      payPayPeriodStartDate <= timeCardDate && payPeriodEndDate >= timeCardDate
    );
  }

  public getHourlyRate(): number {
    return this.hourlyRate;
  }

  public addTimeCard(timeCard: TimeCard): void {
    this.timeCards.set(timeCard.getDate(), timeCard);
  }

  public getTimeCard(date: string): TimeCard {
    return this.timeCards.get(date);
  }
}
