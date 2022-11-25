import { HourlyClassification } from '../../../../domain/payment-classification/hourly-classification';
import { WeeklyScheduler } from '../../../../domain/payment-scheduler/weekly-schedule';
import { AddEmployeeUsecase } from '../add-employee-usecase';

export class AddHourlyEmployeeUsecase extends AddEmployeeUsecase {
  constructor(
    id: string,
    name: string,
    address: string,
    private hourlyRate: number,
  ) {
    super(id, name, address);
  }

  getPaymentClassification(): HourlyClassification {
    return new HourlyClassification(this.hourlyRate);
  }
  getPaymentScheduler(): WeeklyScheduler {
    return new WeeklyScheduler();
  }
}
