import { CommissionClassification } from '../../../../domain/payment-classification/commission-classification';
import { BiweeklyScheduler } from '../../../../domain/payment-scheduler/biweekly-scheduler';
import { AddEmployeeUsecase } from '../add-employee-usecase';

export class AddCommissionedEmployeeUsecase extends AddEmployeeUsecase {
  constructor(
    id: string,
    name: string,
    address: string,
    private salary: number,
    private commissionRate: number,
  ) {
    super(id, name, address);
  }

  getPaymentClassification(): CommissionClassification {
    return new CommissionClassification(this.salary, this.commissionRate);
  }
  getPaymentScheduler(): BiweeklyScheduler {
    return new BiweeklyScheduler();
  }
}
