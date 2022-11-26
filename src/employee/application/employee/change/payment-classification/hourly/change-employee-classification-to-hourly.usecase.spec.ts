import {
  employeeAddressDummy,
  employeeHourlyRateDummy,
  employeeIdDummy,
  employeeNameDummy,
} from '../../../../../../../test/dummies';
import { PayrollRepository } from '../../../../../infraestructure/repositories/payroll.repository';
import { EMPLOYEE_DO_NOT_EXIST } from '../../../../../domain/errors/custom-messages';
import { ChangeEmployeeClassificationToSalaryUsecase } from './change-employee-classification-to-hourly.usecase';
import { HourlyClassification } from '../../../../../domain/payment-classification/hourly-classification';
import { AddHourlyEmployeeUsecase } from '../../../add/hourly/add-hourly-employee.usecase';

describe('ChangeNameEmployee usecase ', () => {
  describe('execute method', () => {
    afterEach(async () => {
      await PayrollRepository.clear();
    });

    it('WHEN execute method is called THEN employee classification should be changed to hourly', async () => {
      await new AddHourlyEmployeeUsecase(
        employeeIdDummy,
        employeeNameDummy,
        employeeAddressDummy,
        employeeHourlyRateDummy,
      ).execute();

      await new ChangeEmployeeClassificationToSalaryUsecase(
        employeeIdDummy,
        employeeHourlyRateDummy,
      ).execute();

      const employee = await PayrollRepository.getEmployee(employeeIdDummy);

      expect(employee.getPaymentClassification()).toBeInstanceOf(
        HourlyClassification,
      );
    });

    it('WHEN execute method is called but employee id do not exist THEN throw a exeption', async () => {
      expect.assertions(1);
      try {
        await new ChangeEmployeeClassificationToSalaryUsecase(
          employeeIdDummy,
          employeeHourlyRateDummy,
        ).execute();
      } catch (error) {
        expect(error.message).toBe(EMPLOYEE_DO_NOT_EXIST);
      }
    });
  });
});
