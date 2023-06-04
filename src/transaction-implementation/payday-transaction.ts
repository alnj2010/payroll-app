import { ERepository } from '../payroll-repository/e-repository';
import { Employee } from '../payroll-domain/employee';
import { Paycheck } from '../payroll-domain/paycheck';
import { Transaction } from '../transaction/transaction';

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
