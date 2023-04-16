import { PaymentClassification } from './payment-classification';
import { TimeCard } from './time-card';

export class HourlyClassification extends PaymentClassification {
  private timeCards = new Map<string, TimeCard>();

  constructor(private hourlyRate: number) {
    super();
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
