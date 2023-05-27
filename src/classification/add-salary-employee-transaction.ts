import { HoldMethod } from '../method/hold-method';
import { MonthlyScheduler } from '../schedule/monthly-scheduler';
import { SalaryClassification } from './salary-classification';
import { AddEmployeeTransaction } from './add-employee-transaction';
import { PaymentClassification } from '../domain/payment-classification';
import { PaymentScheduler } from '../domain/payment-scheduler';
import { PaymentMethod } from '../domain/payment-method';
import { ERepository } from 'src/payroll-database/e-repository';

export class AddSalaryEmployeeTransaction extends AddEmployeeTransaction {
  constructor(
    id: string,
    name: string,
    address: string,
    employeeRepository: ERepository,

    private salary: number,
  ) {
    super(id, name, address, employeeRepository);
  }

  protected createPaymentClassification(): PaymentClassification {
    return new SalaryClassification(this.salary);
  }

  protected createPaymentScheduler(): PaymentScheduler {
    return new MonthlyScheduler();
  }

  protected createPaymentMethod(): PaymentMethod {
    return new HoldMethod();
  }
}
