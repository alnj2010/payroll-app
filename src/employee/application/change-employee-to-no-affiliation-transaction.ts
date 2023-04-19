import { Affiliation } from '../domain/affiliation';
import { Employee } from '../domain/employee';
import { NoAffiliation } from '../domain/no-affiliation';
import { UnionAffiliationsRepository } from '../infraestructure/repositories/union/union-affiliation-repository';
import { ChangeEmployeeAffiliationTransaction } from './change-employee-affiliation-transaction';

export class ChangeEmployeeToNoAffiliationTransaction extends ChangeEmployeeAffiliationTransaction {
  constructor(id: string, private memberId: string) {
    super(id);
  }

  protected getAffiliation(): Affiliation {
    return new NoAffiliation();
  }
  protected registerAffiliation(employee: Employee) {
    UnionAffiliationsRepository.delete(this.memberId);
  }
}
