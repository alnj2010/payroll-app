import { PaymentClassification } from '.';
import { TimeCard } from '../time-card';

export class HourlyClassification extends PaymentClassification {
  private timeCards: TimeCard[] = [];
  constructor(private hourlyRate: number) {
    super();
  }

  getTimeCards(): TimeCard[] {
    return this.timeCards;
  }

  addTimeCard(timeCard: TimeCard) {
    this.timeCards.push(timeCard);
  }
}
