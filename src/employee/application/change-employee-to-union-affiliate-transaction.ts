import { Affiliation } from '../domain/affiliation';
import { Employee } from '../domain/employee';
import { UnionAffiliation } from '../domain/union-affiliation';
import { UnionAffiliationsRepository } from '../infraestructure/repositories/union/union-affiliation-repository';
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
    UnionAffiliationsRepository.create(this.memberId, employee);
  }
}
