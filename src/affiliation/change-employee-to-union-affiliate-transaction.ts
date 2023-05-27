import { Affiliation } from '../domain/affiliation';
import { Employee } from '../domain/employee';
import { UnionAffiliation } from './union-affiliation';
import { UnionAffiliationsRepository } from '../payroll-database-implementation/union-affiliation-repository';
import { ChangeEmployeeAffiliationTransaction } from './change-employee-affiliation-transaction';

export class ChangeEmployeeToUnionAffiliationTransaction extends ChangeEmployeeAffiliationTransaction {
  constructor(
    id: string,
    private memberId: string,
    private memberDuesRate: number,
  ) {
    super(id);
  }

  protected getAffiliation(): Affiliation {
    return new UnionAffiliation(this.memberId, this.memberDuesRate);
  }
  protected registerAffiliation(employee: Employee) {
    const unionAffiliationRepository =
      UnionAffiliationsRepository.getInstance();

    unionAffiliationRepository.create(this.memberId, employee);
  }
}
