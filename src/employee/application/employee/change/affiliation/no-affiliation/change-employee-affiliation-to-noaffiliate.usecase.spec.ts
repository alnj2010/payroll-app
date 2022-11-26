import {
  employeeAddressDummy,
  employeeIdDummy,
  employeeNameDummy,
  employeeSalaryDummy,
  memberDueRateDummy,
  memberIdDummy,
} from '../../../../../../../test/dummies';
import { PayrollRepository } from '../../../../../infraestructure/repositories/payroll.repository';
import { EMPLOYEE_DO_NOT_EXIST } from '../../../../../domain/errors/custom-messages';
import { ChangeEmployeeAffiliationToUnionUsecase } from '../union/change-employee-affiliation-to-union.usecase';

import { AddSalaryEmployeeUsecase } from '../../../add/salary/add-salary-employee.usecase';
import { NoAffiliation } from '../../../../../domain/affiliations/no-affiliation';
import { ChangeEmployeeAffiliationToNoaffiliateUsecase } from './change-employee-affiliation-to-noaffiliate.usecase';

describe('ChangeNameEmployee usecase ', () => {
  describe('execute method', () => {
    afterEach(async () => {
      await PayrollRepository.clear();
    });

    it('WHEN execute method is called THEN will be disaffiliate a employee', async () => {
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

      await new ChangeEmployeeAffiliationToNoaffiliateUsecase(
        employeeIdDummy,
      ).execute();

      const employee = await PayrollRepository.getEmployee(employeeIdDummy);
      const member = await PayrollRepository.getEmployeeByUnionAffiliation(
        memberIdDummy,
      );

      expect(member).toBeNull();
      expect(employee.getAffiliation()).toBeInstanceOf(NoAffiliation);
    });

    it('WHEN execute method is called but employee id do not exist THEN throw a exeption', async () => {
      expect.assertions(1);
      try {
        await new ChangeEmployeeAffiliationToNoaffiliateUsecase(
          employeeIdDummy,
        ).execute();
      } catch (error) {
        expect(error.message).toBe(EMPLOYEE_DO_NOT_EXIST);
      }
    });
  });
});
