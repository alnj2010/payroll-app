import { PaymentClassification } from '.';

export class CommissionClassification extends PaymentClassification {
  constructor(private salary: number, private commissionRate: number) {
    super();
  }
}
