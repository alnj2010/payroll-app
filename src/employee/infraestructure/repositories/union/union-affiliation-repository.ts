import { DB } from '../../../../db';
import { Employee } from 'src/employee/domain/employee';

export class UnionAffiliationsRepository {
  static create(memberId: string, employee: Employee) {
    DB.unionAffiliations.set(memberId, employee);
  }

  static read(memberId: string): Employee {
    const employee = DB.unionAffiliations.get(memberId);
    if (employee) {
      return employee;
    } else {
      throw new Error('UnionAffiliation not found');
    }
  }

  static delete(memberId: string) {
    return DB.unionAffiliations.delete(memberId);
  }

  static clear() {
    return DB.unionAffiliations.clear();
  }
}
