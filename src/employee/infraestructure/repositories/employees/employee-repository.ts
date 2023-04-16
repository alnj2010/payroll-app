import { DB } from '../../../../db';
import { Employee } from '../../../../employee/domain/employee';

export class EmployeeRepository {
  static create(employee: Employee) {
    DB.employees.set(employee.getId(), employee);
  }

  static read(id: string): Employee {
    return DB.employees.get(id);
  }

  static delete(id: string) {
    return DB.employees.delete(id);
  }
}
