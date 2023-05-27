import { DB } from '../db';
import { Employee } from '../domain/employee';
import { AffiliationRepository } from '../payroll-database/afiliation-repository';

export class UnionAffiliationsRepository implements AffiliationRepository {
  private static instance: UnionAffiliationsRepository;

  static getInstance(): UnionAffiliationsRepository {
    if (!this.instance) {
      this.instance = new UnionAffiliationsRepository();
    }
    return this.instance;
  }

  create(memberId: string, employee: Employee) {
    DB.unionAffiliations.set(memberId, employee);
  }

  read(memberId: string): Employee {
    const employee = DB.unionAffiliations.get(memberId);
    if (employee) {
      return employee;
    } else {
      throw new Error('UnionAffiliation not found');
    }
  }

  delete(memberId: string) {
    return DB.unionAffiliations.delete(memberId);
  }

  clear() {
    return DB.unionAffiliations.clear();
  }
}
