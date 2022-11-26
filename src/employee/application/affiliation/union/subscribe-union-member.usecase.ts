import { UnionAffiliation } from '../../../domain/affiliations/union-affiliation';
import { EMPLOYEE_DO_NOT_EXIST } from '../../../domain/errors/custom-messages';
import { Transaction } from '../../../domain/transacction';
import { PayrollRepository } from '../../../infraestructure/repositories/payroll.repository';

export class SubscribeUnionMemberUsecase implements Transaction {
  constructor(
    private employeeId: string,
    private memberId: string,
    private dueRate: number,
  ) {}

  async execute() {
    const employee = await PayrollRepository.getEmployee(this.employeeId);

    if (!employee) {
      throw new Error(EMPLOYEE_DO_NOT_EXIST);
    }

    const unionAffiliation = new UnionAffiliation(this.dueRate);

    employee.setAffiliation(unionAffiliation);

    await PayrollRepository.addEmployeeToUnionAffiliation(
      this.memberId,
      employee,
    );
  }
}
