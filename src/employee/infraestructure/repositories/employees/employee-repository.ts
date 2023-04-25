import { DB } from '../../../../db';
import { Employee } from '../../../../employee/domain/employee';

export class EmployeeRepository {
  static create(employee: Employee) {
    DB.employees.set(employee.getId(), employee);
  }

  static read(id: string): Employee {
    const employee = DB.employees.get(id);
    if (employee) {
      return employee;
    } else {
      throw new Error('Employee not found');
    }
  }

  static readAll(): Employee[] {
    return Array.from(DB.employees, ([, value]) => value);
  }

  static delete(id: string) {
    return DB.employees.delete(id);
  }

  static clear() {
    return DB.employees.clear();
  }
}
