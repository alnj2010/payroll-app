import { SalaryClassification } from '../../../../domain/payment-classification/salary-classification';
import { MonthlyScheduler } from '../../../../domain/payment-scheduler/monthly-scheduler';
import { AddEmployeeUsecase } from '../add-employee-usecase';

export class AddSalaryEmployeeUsecase extends AddEmployeeUsecase {
  constructor(
    id: string,
    name: string,
    address: string,
    private salary: number,
  ) {
    super(id, name, address);
  }

  getPaymentClassification(): SalaryClassification {
    return new SalaryClassification(this.salary);
  }
  getPaymentScheduler(): MonthlyScheduler {
    return new MonthlyScheduler();
  }
}
