import { Employee } from '../domain/employee';

import { PaymentClassification } from '../domain/payment-classification';
import { PaymentMethod } from '../domain/payment-method';
import { PaymentScheduler } from '../domain/payment-scheduler';
import { Transaction } from '../domain/transaction';
import { EmployeeRepository } from '../infraestructure/repositories/employees/employee-repository';

export abstract class AddEmployeeTransaction implements Transaction {
  constructor(
    protected id: string,
    protected name: string,
    protected address: string,
  ) {}

  protected abstract createPaymentClassification(): PaymentClassification;
  protected abstract createPaymentScheduler(): PaymentScheduler;
  protected abstract createPaymentMethod(): PaymentMethod;

  public execute(): void {
    const employee = new Employee(this.id, this.name, this.address);

    employee.setPaymentClassification(this.createPaymentClassification());
    employee.setPaymentScheduler(this.createPaymentScheduler());
    employee.setPaymentMethod(this.createPaymentMethod());

    EmployeeRepository.create(employee);
  }
}
