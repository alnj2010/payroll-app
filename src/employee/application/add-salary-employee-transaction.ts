import { HoldMethod } from '../domain/hold-method';
import { MonthlyScheduler } from '../domain/monthly-scheduler';
import { SalaryClassification } from '../domain/salary-classification';
import { AddEmployeeTransaction } from './add-employee';

export class AddSalaryEmployeeTransaction extends AddEmployeeTransaction {
  constructor(
    id: string,
    name: string,
    address: string,

    private salary: number,
  ) {
    super(id, name, address);
  }

  protected createPaymentClassification() {
    return new SalaryClassification(this.salary);
  }

  protected createPaymentScheduler() {
    return new MonthlyScheduler();
  }

  protected createPaymentMethod() {
    return new HoldMethod();
  }
}
