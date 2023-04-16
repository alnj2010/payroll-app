import { PaymentClassification } from './payment-classification';

export class HourlyClassification extends PaymentClassification {
  constructor(private hourlyRate: number) {
    super();
  }

  public getHourlyRate(): number {
    return this.hourlyRate;
  }
}
