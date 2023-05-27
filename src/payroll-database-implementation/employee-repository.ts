import { ERepository } from '../payroll-database/e-repository';
import { DB } from '../db';
import { Employee } from '../domain/employee';

export class EmployeeRepository implements ERepository {
  create(employee: Employee) {
    DB.employees.set(employee.getId(), employee);
  }

  read(id: string): Employee {
    const employee = DB.employees.get(id);
    if (employee) {
      return employee;
    } else {
      throw new Error('Employee not found');
    }
  }

  readAll(): Employee[] {
    return Array.from(DB.employees, ([, value]) => value);
  }

  delete(id: string) {
    return DB.employees.delete(id);
  }

  clear() {
    return DB.employees.clear();
  }
}
