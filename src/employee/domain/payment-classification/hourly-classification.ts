import { PaymentClassification } from '.';

export class HourlyClassification extends PaymentClassification {
  constructor(private hourlyRate: number) {
    super();
  }
}
