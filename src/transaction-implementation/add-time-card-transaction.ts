import { Employee } from '../payroll-domain/employee';
import { HourlyClassification } from '../payroll-implementations/hourly-classification';

import { Transaction } from '../transaction/transaction';
import { ERepository } from '../payroll-repository/e-repository';
import { PayrollFactory } from '../payroll-factory/payroll-factory';

export class AddTimeCardTransaction implements Transaction {
  constructor(
    private id: string,
    private date: string,
    private hours: number,
    private employeeRepository: ERepository,
    private payrollFactoryImplementation: PayrollFactory,
  ) {}

  public execute(): void {
    try {
      const employee: Employee = this.employeeRepository.read(this.id);

      const classification = this.getHourlyClassification(employee);

      const timeCard = this.payrollFactoryImplementation.makeTimeCard(
        this.date,
        this.hours,
      );
      classification.addTimeCard(timeCard);
    } catch (error) {
      throw error;
    }
  }

  private getHourlyClassification(employee: Employee): HourlyClassification {
    const classification = employee.getPaymentClassification();

    if (classification instanceof HourlyClassification) {
      return classification;
    } else {
      throw new Error('The Employee is not hourly payment classification');
    }
  }
}
