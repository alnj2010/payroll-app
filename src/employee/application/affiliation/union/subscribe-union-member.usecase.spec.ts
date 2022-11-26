import {
  employeeAddressDummy,
  employeeIdDummy,
  employeeNameDummy,
  employeeSalaryDummy,
  memberDueRateDummy,
  memberIdDummy,
} from '../../../../../test/dummies';

import { PayrollRepository } from '../../../infraestructure/repositories/payroll.repository';
import { AddSalaryEmployeeUsecase } from '../../employee/add/salary/add-salary-employee.usecase';
import { SubscribeUnionMemberUsecase } from './subscribe-union-member.usecase';
import { EMPLOYEE_DO_NOT_EXIST } from '../../../domain/errors/custom-messages';
import { Employee } from '../../../domain/employee';
import { UnionAffiliation } from 'src/employee/domain/affiliations/union-affiliation';

describe('addTimeCard usecase ', () => {
  describe('execute method', () => {
    afterEach(async () => {
      await PayrollRepository.clear();
    });

    it('WHEN execute method is called THEN will be affiliate a employee to union affiliation', async () => {
      await new AddSalaryEmployeeUsecase(
        employeeIdDummy,
        employeeNameDummy,
        employeeAddressDummy,
        employeeSalaryDummy,
      ).execute();

      await new SubscribeUnionMemberUsecase(
        employeeIdDummy,
        memberIdDummy,
        memberDueRateDummy,
      ).execute();

      const employee: Employee =
        await PayrollRepository.getEmployeeByUnionAffiliation(memberIdDummy);

      const unionAffiliation = employee.getAffiliation() as UnionAffiliation;

      expect(employee.getId()).toBe(employeeIdDummy);
      expect(unionAffiliation.getDueRate()).toBe(memberDueRateDummy);
    });

    it('WHEN execute method is called but employee id do not exist THEN throw a exeption', async () => {
      expect.assertions(1);
      try {
        await new SubscribeUnionMemberUsecase(
          employeeIdDummy,
          memberIdDummy,
          memberDueRateDummy,
        ).execute();
      } catch (error) {
        expect(error.message).toBe(EMPLOYEE_DO_NOT_EXIST);
      }
    });
  });
});
