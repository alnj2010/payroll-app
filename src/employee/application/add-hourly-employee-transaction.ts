import { HoldMethod } from '../domain/hold-method';
import { HourlyClassification } from '../domain/hourly-classification';
import { AddEmployeeTransaction } from './add-employee';
import { WeeklyScheduler } from '../domain/weekly-scheduler';

export class AddHourlyEmployeeTransaction extends AddEmployeeTransaction {
  constructor(
    id: string,
    name: string,
    address: string,

    private hourlyRate: number,
  ) {
    super(id, name, address);
  }

  protected createPaymentClassification() {
    return new HourlyClassification(this.hourlyRate);
  }

  protected createPaymentScheduler() {
    return new WeeklyScheduler();
  }

  protected createPaymentMethod() {
    return new HoldMethod();
  }
}
