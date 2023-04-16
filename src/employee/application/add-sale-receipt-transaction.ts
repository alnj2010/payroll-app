import { Employee } from '../domain/employee';
import { CommissionClassification } from '../domain/commission-classification';
import { SaleReceipt } from '../domain/sale-receipt';

import { Transaction } from '../domain/transaction';
import { EmployeeRepository } from '../infraestructure/repositories/employees/employee-repository';

export class AddSaleReceiptTransaction implements Transaction {
  constructor(
    protected id: string,
    protected date: string,
    protected amount: number,
  ) {}

  public execute(): void {
    try {
      const employee: Employee = EmployeeRepository.read(this.id);

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
