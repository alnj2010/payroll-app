import { Employee } from '../domain/employee';
import { CommissionClassification } from './commission-classification';
import { SaleReceipt } from './sale-receipt';

import { Transaction } from '../domain/transaction';
import { EmployeeRepository } from '../payroll-database-implementation/employee-repository';

export class AddSaleReceiptTransaction implements Transaction {
  constructor(
    protected id: string,
    protected date: string,
    protected amount: number,
  ) {}

  public execute(): void {
    try {
      const employeeRepository = EmployeeRepository.getInstance();
      const employee: Employee = employeeRepository.read(this.id);

      const classification = this.getCommissionClassification(employee);

      const timeCard = new SaleReceipt(this.date, this.amount);
      classification.addSaleReceipt(timeCard);
    } catch (error) {
      throw error;
    }
  }

  private getCommissionClassification(
    employee: Employee,
  ): CommissionClassification {
    const classification = employee.getPaymentClassification();

    if (classification instanceof CommissionClassification) {
      return classification;
    } else {
      throw new Error('The Employee is not commission payment classification');
    }
  }
}
