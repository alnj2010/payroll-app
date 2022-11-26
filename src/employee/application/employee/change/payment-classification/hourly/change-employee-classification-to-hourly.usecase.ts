import { HourlyClassification } from '../../../../../domain/payment-classification/hourly-classification';
import { Employee } from '../../../../../domain/employee';
import { ChangeEmployeeUsecase } from '../../change-employee.usecase';
import { WeeklyScheduler } from '../../../../../domain/payment-scheduler/weekly-schedule';

export class ChangeEmployeeClassificationToHourlyUsecase extends ChangeEmployeeUsecase {
  constructor(employeeId: string, private hourlyRate: number) {
    super(employeeId);
  }

  async changeProperty(employee: Employee) {
    employee.setPaymentClassification(
      new HourlyClassification(this.hourlyRate),
    );
    employee.setPaymentScheduler(new WeeklyScheduler());
  }
}
