import { HourlyClassification } from '../../../../../domain/payment-classification/hourly-classification';
import { Employee } from '../../../../../domain/employee';
import { ChangeEmployeeUsecase } from '../../change-employee.usecase';

export class ChangeEmployeeClassificationToSalaryUsecase extends ChangeEmployeeUsecase {
  constructor(employeeId: string, private hourlyRate: number) {
    super(employeeId);
  }

  async changeProperty(employee: Employee) {
    employee.setPaymentClassification(
      new HourlyClassification(this.hourlyRate),
    );
  }
}
