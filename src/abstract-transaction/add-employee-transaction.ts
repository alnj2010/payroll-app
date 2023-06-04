import { Employee } from '../payroll-domain/employee';

import { PaymentClassification } from '../payroll-domain/payment-classification';
import { PaymentMethod } from '../payroll-domain/payment-method';
import { PaymentScheduler } from '../payroll-domain/payment-scheduler';
import { Transaction } from '../transaction/transaction';
import { ERepository } from '../payroll-repository/e-repository';
import { PayrollFactory } from '../payroll-factory/payroll-factory';

export abstract class AddEmployeeTransaction implements Transaction {
  constructor(
    protected id: string,
    protected name: string,
    protected address: string,
    protected employeeRepository: ERepository,
    protected payrollFactoryImplementation: PayrollFactory,
  ) {}

  protected abstract createPaymentClassification(): PaymentClassification;
  protected abstract createPaymentScheduler(): PaymentScheduler;
  protected abstract createPaymentMethod(): PaymentMethod;

  public execute(): void {
    const employee = new Employee(this.id, this.name, this.address);

    employee.setPaymentClassification(this.createPaymentClassification());
    employee.setPaymentScheduler(this.createPaymentScheduler());
    employee.setPaymentMethod(this.createPaymentMethod());
    employee.setAffiliation(
      this.payrollFactoryImplementation.makeNoAffiliation(),
    );

    this.employeeRepository.create(employee);
  }
}
