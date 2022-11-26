import { Employee } from '../../../../../domain/employee';
import { ChangeEmployeeUsecase } from '../../change-employee.usecase';
import { CommissionClassification } from '../../../../../domain/payment-classification/commission-classification';
import { BiweeklyScheduler } from '../../../../../domain/payment-scheduler/biweekly-scheduler';

export class ChangeEmployeeClassificationToCommissionUsecase extends ChangeEmployeeUsecase {
  constructor(
    employeeId: string,
    private salary: number,
    private commissionRate,
  ) {
    super(employeeId);
  }

  async changeProperty(employee: Employee) {
    employee.setPaymentClassification(
      new CommissionClassification(this.salary, this.commissionRate),
    );
    employee.setPaymentScheduler(new BiweeklyScheduler());
  }
}
