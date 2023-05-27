import { Employee } from '../domain/employee';
import { HourlyClassification } from './hourly-classification';
import { TimeCard } from './time-card';

import { Transaction } from '../domain/transaction';
import { EmployeeRepository } from '../payroll-database-implementation/employee-repository';

export class AddTimeCardTransaction implements Transaction {
  constructor(
    protected id: string,
    protected date: string,
    protected hours: number,
  ) {}

  public execute(): void {
    try {
      const employeeRepository = EmployeeRepository.getInstance();
      const employee: Employee = employeeRepository.read(this.id);

      const classification = this.getHourlyClassification(employee);

      const timeCard = new TimeCard(this.date, this.hours);
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
