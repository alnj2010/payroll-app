import { HoldMethod } from '../method/hold-method';
import { MonthlyScheduler } from '../schedule/monthly-scheduler';
import { SalaryClassification } from './salary-classification';
import { AddEmployeeTransaction } from './add-employee-transaction';
import { PaymentClassification } from '../domain/payment-classification';
import { PaymentScheduler } from '../domain/payment-scheduler';
import { PaymentMethod } from '../domain/payment-method';

export class AddSalaryEmployeeTransaction extends AddEmployeeTransaction {
  constructor(
    id: string,
    name: string,
    address: string,

    private salary: number,
  ) {
    super(id, name, address);
  }

  protected createPaymentClassification(): PaymentClassification {
    return new SalaryClassification(this.salary);
  }

  protected createPaymentScheduler(): PaymentScheduler {
    return new MonthlyScheduler();
  }

  protected createPaymentMethod(): PaymentMethod {
    return new HoldMethod();
  }
}
