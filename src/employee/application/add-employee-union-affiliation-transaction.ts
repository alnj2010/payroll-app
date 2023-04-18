import { Transaction } from '../domain/transaction';
import { EmployeeRepository } from '../infraestructure/repositories/employees/employee-repository';
import { UnionAffiliation } from '../domain/union-affiliation';
import { UnionAffiliationsRepository } from '../infraestructure/repositories/union/union-affiliation-repository';

export class AddEmployeeUnionAffiliationTransaction implements Transaction {
  constructor(
    private memberId: string,
    private dueRate: number,
    private employeeId: string,
  ) {}

  public execute(): void {
    try {
      const employee = EmployeeRepository.read(this.employeeId);
      const unionAffiliation = new UnionAffiliation(
        this.memberId,
        this.dueRate,
      );
      employee.setAffiliation(unionAffiliation);
      UnionAffiliationsRepository.create(this.memberId, employee);
    } catch (error) {
      throw error;
    }
  }
}
