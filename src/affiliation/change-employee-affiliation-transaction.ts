import { Affiliation } from '../domain/affiliation';
import { Employee } from '../domain/employee';

import { ChangeEmployeeTransaction } from '../change-employee-transaction/change-employee-transaction';
import { ERepository } from 'src/payroll-database/e-repository';

export abstract class ChangeEmployeeAffiliationTransaction extends ChangeEmployeeTransaction {
  constructor(id: string, employeeRepository: ERepository) {
    super(id, employeeRepository);
  }
  protected abstract getAffiliation(): Affiliation;
  protected abstract registerAffiliation(employee: Employee): void;

  protected change(employee: Employee): void {
    this.registerAffiliation(employee);
    employee.setAffiliation(this.getAffiliation());
  }
}
