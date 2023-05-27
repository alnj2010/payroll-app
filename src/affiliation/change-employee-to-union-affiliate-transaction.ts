import { Affiliation } from '../domain/affiliation';
import { Employee } from '../domain/employee';
import { UnionAffiliation } from './union-affiliation';
import { UnionAffiliationsRepository } from '../payroll-database-implementation/union-affiliation-repository';
import { ChangeEmployeeAffiliationTransaction } from './change-employee-affiliation-transaction';
import { ERepository } from 'src/payroll-database/e-repository';
import { AffiliationRepository } from 'src/payroll-database/afiliation-repository';

export class ChangeEmployeeToUnionAffiliationTransaction extends ChangeEmployeeAffiliationTransaction {
  constructor(
    id: string,
    employeeRepository: ERepository,
    private unionAffiliationRepository: AffiliationRepository,
    private memberId: string,
    private memberDuesRate: number,
  ) {
    super(id, employeeRepository);
  }

  protected getAffiliation(): Affiliation {
    return new UnionAffiliation(this.memberId, this.memberDuesRate);
  }
  protected registerAffiliation(employee: Employee) {
    this.unionAffiliationRepository.create(this.memberId, employee);
  }
}
