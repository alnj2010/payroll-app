import { Affiliation } from '../domain/affiliation';
import { Employee } from '../domain/employee';
import { NoAffiliation } from './no-affiliation';
import { UnionAffiliation } from './union-affiliation';
import { UnionAffiliationsRepository } from '../payroll-database-implementation/union-affiliation-repository';
import { ChangeEmployeeAffiliationTransaction } from './change-employee-affiliation-transaction';
import { ERepository } from 'src/payroll-database/e-repository';

export class ChangeEmployeeToNoAffiliationTransaction extends ChangeEmployeeAffiliationTransaction {
  constructor(id: string, employeeRepository: ERepository) {
    super(id, employeeRepository);
  }

  protected getAffiliation(): Affiliation {
    return new NoAffiliation();
  }
  protected registerAffiliation(employee: Employee) {
    const affiliation = employee.getAffiliation() as UnionAffiliation;
    const memberId = affiliation.getMemberId();
    const unionAffiliationRepository =
      UnionAffiliationsRepository.getInstance();

    unionAffiliationRepository.delete(memberId);
  }
}
