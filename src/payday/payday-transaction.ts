import { ERepository } from 'src/payroll-database/e-repository';
import { Employee } from '../domain/employee';
import { Paycheck } from '../domain/paycheck';
import { Transaction } from '../domain/transaction';

export class PaydayTransaction implements Transaction {
  private paychecks = new Map<string, Paycheck>();
  constructor(private date: string, private employeeRepository: ERepository) {}

  public getPaychecks(): Map<string, Paycheck> {
    return this.paychecks;
  }

  public execute(): void {
    const employees: Employee[] = this.employeeRepository.readAll();
    employees.forEach((employee) => {
      if (employee.isPayDay(this.date)) {
        const paycheck = employee.payDay(this.date);
        this.paychecks.set(employee.getId(), paycheck);
      }
    });
  }
}
