import {
  employeeAddressDummy,
  employeeIdDummy,
  employeeNameDummy,
  employeeSalaryDummy,
} from '../../../../../../test/dummies';
import { PayrollRepository } from '../../../../infraestructure/repositories/payroll.repository';
import { AddSalaryEmployeeUsecase } from '../../add/salary/add-salary-employee.usecase';
import { EMPLOYEE_DO_NOT_EXIST } from '../../../../domain/errors/custom-messages';
import { ChangeNameEmployeeUsecase } from './change-name-employee.usecase';

describe('ChangeNameEmployee usecase ', () => {
  const newName = 'newName';
  describe('execute method', () => {
    afterEach(async () => {
      await PayrollRepository.clear();
    });

    it('WHEN execute method is called THEN employee name should be change', async () => {
      await new AddSalaryEmployeeUsecase(
        employeeIdDummy,
        employeeNameDummy,
        employeeAddressDummy,
        employeeSalaryDummy,
      ).execute();

      await new ChangeNameEmployeeUsecase(employeeIdDummy, newName).execute();

      const employee = await PayrollRepository.getEmployee(employeeIdDummy);

      expect(employee.getName()).toBe(newName);
    });

    it('WHEN execute method is called but employee id do not exist THEN throw a exeption', async () => {
      expect.assertions(1);
      try {
        await new ChangeNameEmployeeUsecase(employeeIdDummy, newName).execute();
      } catch (error) {
        expect(error.message).toBe(EMPLOYEE_DO_NOT_EXIST);
      }
    });
  });
});
