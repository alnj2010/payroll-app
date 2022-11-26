import { Employee } from '../../../../../domain/employee';
import { ChangeEmployeeUsecase } from '../../change-employee.usecase';
import { SalaryClassification } from '../../../../../domain/payment-classification/salary-classification';
import { MonthlyScheduler } from '../../../../../domain/payment-scheduler/monthly-scheduler';

export class ChangeEmployeeClassificationToSalaryUsecase extends ChangeEmployeeUsecase {
  constructor(employeeId: string, private salary: number) {
    super(employeeId);
  }

  async changeProperty(employee: Employee) {
    employee.setPaymentClassification(new SalaryClassification(this.salary));
    employee.setPaymentScheduler(new MonthlyScheduler());
  }
}
