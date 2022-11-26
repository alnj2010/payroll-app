import { ServiceCharge } from '../../../domain/service-charge';
import { MEMBER_DO_NOT_EXIST } from '../../../domain/errors/custom-messages';
import { Transaction } from '../../../domain/transacction';
import { PayrollRepository } from '../../../infraestructure/repositories/payroll.repository';
import { Employee } from '../../../domain/employee';
import { UnionAffiliation } from '../../../domain/affiliations/union-affiliation';

export class AddServiceChargeUsecase implements Transaction {
  constructor(private memberId: string, private serviceChargeAmount: number) {}

  async execute() {
    const employee: Employee =
      await PayrollRepository.getEmployeeByUnionAffiliation(this.memberId);

    if (!employee) {
      throw new Error(MEMBER_DO_NOT_EXIST);
    }

    const newServiceCharge = new ServiceCharge(this.serviceChargeAmount);

    const unionAffiliation = employee.getAffiliation() as UnionAffiliation;
    unionAffiliation.addServiceCharges(newServiceCharge);
  }
}
