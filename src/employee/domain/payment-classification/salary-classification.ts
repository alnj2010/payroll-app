import { PaymentClassification } from '.';

export class SalaryClassification extends PaymentClassification {
  constructor(private salary: number) {
    super();
  }
}
