import {
  employeeNameDummy,
  employeeIdDummy,
  employeeAddressDummy,
  employeeSalaryDummy,
} from '../../../../../../test/dummies';
import { PayrollRepository } from '../../../../infraestructure/repositories/payroll.repository';
import { AddSalaryEmployeeUsecase } from '../../add/salary/add-salary-employee.usecase';
import { EMPLOYEE_DO_NOT_EXIST } from '../../../../domain/errors/custom-messages';
import { ChangeAddressEmployeeUsecase } from './change-address-employee.usecase';

describe('ChangeAddressEmployee usecase ', () => {
  const newAddress = 'newAddress';
  describe('execute method', () => {
    afterEach(async () => {
      await PayrollRepository.clear();
    });

    it('WHEN execute method is called THEN employee address should be change', async () => {
      await new AddSalaryEmployeeUsecase(
        employeeIdDummy,
        employeeNameDummy,
        employeeAddressDummy,
        employeeSalaryDummy,
      ).execute();

      await new ChangeAddressEmployeeUsecase(
        employeeIdDummy,
        newAddress,
      ).execute();

      const employee = await PayrollRepository.getEmployee(employeeIdDummy);

      expect(employee.getAddress()).toBe(newAddress);
    });

    it('WHEN execute method is called but employee id do not exist THEN throw a exeption', async () => {
      expect.assertions(1);
      try {
        await new ChangeAddressEmployeeUsecase(
          employeeIdDummy,
          newAddress,
        ).execute();
      } catch (error) {
        expect(error.message).toBe(EMPLOYEE_DO_NOT_EXIST);
      }
    });
  });
});
