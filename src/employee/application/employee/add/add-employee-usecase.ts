import { Transaction } from '../../../domain/transacction';
import { Employee } from '../../../domain/employee';
import { PaymentClassification } from '../../../domain/payment-classification';
import { HoldMethod } from '../../../domain/payment-method/hold-method';
import { PaymentScheduler } from '../../../domain/payment-scheduler';
import { PayrollRepository } from '../../../infraestructure/repositories/payroll.repository';
import { NoAffiliation } from '../../../domain/affiliations/no-affiliation';

export abstract class AddEmployeeUsecase implements Transaction {
  constructor(
    protected id: string,
    protected name: string,
    protected address: string,
  ) {}
  async execute() {
    const newEmployee = new Employee(this.id, this.name, this.address);

    newEmployee.setPaymentClassification(this.getPaymentClassification());
    newEmployee.setPaymentMethod(new HoldMethod());
    newEmployee.setPaymentScheduler(this.getPaymentScheduler());
    newEmployee.setAffiliation(new NoAffiliation());

    await PayrollRepository.addEmployee(newEmployee);
  }

  abstract getPaymentClassification(): PaymentClassification;
  abstract getPaymentScheduler(): PaymentScheduler;
}
