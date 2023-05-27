import { Employee } from '../domain/employee';
import { CommissionClassification } from './commission-classification';
import { SaleReceipt } from './sale-receipt';

import { Transaction } from '../domain/transaction';
import { ERepository } from 'src/payroll-database/e-repository';

export class AddSaleReceiptTransaction implements Transaction {
  constructor(
    private id: string,
    private date: string,
    private amount: number,
    private employeeRepository: ERepository,
  ) {}

  public execute(): void {
    try {
      const employee: Employee = this.employeeRepository.read(this.id);

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
