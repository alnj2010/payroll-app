import { Employee } from '../payroll-domain/employee';
import { CommissionClassification } from '../payroll-implementations/commission-classification';

import { Transaction } from '../transaction/transaction';
import { ERepository } from '../payroll-repository/e-repository';
import { PayrollFactory } from '../payroll-factory/payroll-factory';

export class AddSaleReceiptTransaction implements Transaction {
  constructor(
    private id: string,
    private date: string,
    private amount: number,
    private employeeRepository: ERepository,
    private payrollFactoryImplementation: PayrollFactory,
  ) {}

  public execute(): void {
    try {
      const employee: Employee = this.employeeRepository.read(this.id);

      const classification = this.getCommissionClassification(employee);

      const timeCard = this.payrollFactoryImplementation.makeSaleReceipt(
        this.date,
        this.amount,
      );
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
