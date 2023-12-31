import {
  employeeAddressDummy,
  employeeHourlyRateDummy,
  employeeIdDummy,
  employeeNameDummy,
  employeeSalaryDummy,
} from '../../../../../../../test/dummies';
import { PayrollRepository } from '../../../../../infraestructure/repositories/payroll.repository';
import { EMPLOYEE_DO_NOT_EXIST } from '../../../../../domain/errors/custom-messages';
import { ChangeEmployeeClassificationToHourlyUsecase } from './change-employee-classification-to-hourly.usecase';
import { HourlyClassification } from '../../../../../domain/payment-classification/hourly-classification';
import { AddSalaryEmployeeUsecase } from '../../../add/salary/add-salary-employee.usecase';
import { WeeklyScheduler } from '../../../../../domain/payment-scheduler/weekly-schedule';

describe('ChangeNameEmployee usecase ', () => {
  describe('execute method', () => {
    afterEach(async () => {
      await PayrollRepository.clear();
    });

    it('WHEN execute method is called THEN employee classification should be changed to hourly', async () => {
      await new AddSalaryEmployeeUsecase(
        employeeIdDummy,
        employeeNameDummy,
        employeeAddressDummy,
        employeeSalaryDummy,
      ).execute();

      await new ChangeEmployeeClassificationToHourlyUsecase(
        employeeIdDummy,
        employeeHourlyRateDummy,
      ).execute();

      const employee = await PayrollRepository.getEmployee(employeeIdDummy);

      expect(employee.getPaymentClassification()).toBeInstanceOf(
        HourlyClassification,
      );
      expect(employee.getPaymentScheduler()).toBeInstanceOf(WeeklyScheduler);
    });

    it('WHEN execute method is called but employee id do not exist THEN throw a exeption', async () => {
      expect.assertions(1);
      try {
        await new ChangeEmployeeClassificationToHourlyUsecase(
          employeeIdDummy,
          employeeHourlyRateDummy,
        ).execute();
      } catch (error) {
        expect(error.message).toBe(EMPLOYEE_DO_NOT_EXIST);
      }
    });
  });
});
