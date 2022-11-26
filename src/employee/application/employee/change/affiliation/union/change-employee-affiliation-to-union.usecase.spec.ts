import {
  employeeAddressDummy,
  employeeHourlyRateDummy,
  employeeIdDummy,
  employeeNameDummy,
  employeeSalaryDummy,
  memberDueRateDummy,
  memberIdDummy,
} from '../../../../../../../test/dummies';
import { PayrollRepository } from '../../../../../infraestructure/repositories/payroll.repository';
import { EMPLOYEE_DO_NOT_EXIST } from '../../../../../domain/errors/custom-messages';
import { ChangeEmployeeAffiliationToUnionUsecase } from './change-employee-affiliation-to-union.usecase';
import { SalaryClassification } from '../../../../../domain/payment-classification/salary-classification';
import { AddHourlyEmployeeUsecase } from '../../../add/hourly/add-hourly-employee.usecase';
import { AddSalaryEmployeeUsecase } from '../../../add/salary/add-salary-employee.usecase';
import { Employee } from '../../../../../domain/employee';
import { UnionAffiliation } from '../../../../../domain/affiliations/union-affiliation';

describe('ChangeNameEmployee usecase ', () => {
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

      await new ChangeEmployeeAffiliationToUnionUsecase(
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
        await new ChangeEmployeeAffiliationToUnionUsecase(
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
