import { HoldMethod } from '../method/hold-method';
import { AddEmployeeTransaction } from './add-employee-transaction';
import { CommissionClassification } from './commission-classification';
import { BiweeklyScheduler } from '../schedule/biweekly-scheduler';
import { PaymentClassification } from '../domain/payment-classification';
import { PaymentScheduler } from '../domain/payment-scheduler';
import { PaymentMethod } from '../domain/payment-method';
import { ERepository } from 'src/payroll-database/e-repository';

export class AddCommissionEmployeeTransaction extends AddEmployeeTransaction {
  constructor(
    id: string,
    name: string,
    address: string,
    employeeRepository: ERepository,

    private salary: number,
    private commissionRate: number,
  ) {
    super(id, name, address, employeeRepository);
  }

  protected createPaymentClassification(): PaymentClassification {
    return new CommissionClassification(this.salary, this.commissionRate);
  }

  protected createPaymentScheduler(): PaymentScheduler {
    return new BiweeklyScheduler();
  }

  protected createPaymentMethod(): PaymentMethod {
    return new HoldMethod();
  }
}
