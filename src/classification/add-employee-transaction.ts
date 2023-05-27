import { Employee } from '../domain/employee';
import { NoAffiliation } from '../affiliation/no-affiliation';

import { PaymentClassification } from '../domain/payment-classification';
import { PaymentMethod } from '../domain/payment-method';
import { PaymentScheduler } from '../domain/payment-scheduler';
import { Transaction } from '../domain/transaction';
import { ERepository } from 'src/payroll-database/e-repository';

export abstract class AddEmployeeTransaction implements Transaction {
  constructor(
    protected id: string,
    protected name: string,
    protected address: string,
    protected employeeRepository: ERepository,
  ) {}

  protected abstract createPaymentClassification(): PaymentClassification;
  protected abstract createPaymentScheduler(): PaymentScheduler;
  protected abstract createPaymentMethod(): PaymentMethod;

  public execute(): void {
    const employee = new Employee(this.id, this.name, this.address);

    employee.setPaymentClassification(this.createPaymentClassification());
    employee.setPaymentScheduler(this.createPaymentScheduler());
    employee.setPaymentMethod(this.createPaymentMethod());
    employee.setAffiliation(new NoAffiliation());

    this.employeeRepository.create(employee);
  }
}
