import {
  employeeAddressDummy,
  employeeHourlyRateDummy,
  employeeIdDummy,
  employeeNameDummy,
  employeeSalaryDummy,
} from '../../../../../../../test/dummies';
import { PayrollRepository } from '../../../../../infraestructure/repositories/payroll.repository';
import { EMPLOYEE_DO_NOT_EXIST } from '../../../../../domain/errors/custom-messages';
import { ChangeEmployeeClassificationToSalaryUsecase } from './change-employee-classification-to-salary.usecase';
import { SalaryClassification } from '../../../../../domain/payment-classification/salary-classification';
import { AddHourlyEmployeeUsecase } from '../../../add/hourly/add-hourly-employee.usecase';
import { MonthlyScheduler } from '../../../../../domain/payment-scheduler/monthly-scheduler';

describe('ChangeNameEmployee usecase ', () => {
  describe('execute method', () => {
    afterEach(async () => {
      await PayrollRepository.clear();
    });

    it('WHEN execute method is called THEN employee classification should be changed to salary', async () => {
      await new AddHourlyEmployeeUsecase(
        employeeIdDummy,
        employeeNameDummy,
        employeeAddressDummy,
        employeeHourlyRateDummy,
      ).execute();

      await new ChangeEmployeeClassificationToSalaryUsecase(
        employeeIdDummy,
        employeeSalaryDummy,
      ).execute();

      const employee = await PayrollRepository.getEmployee(employeeIdDummy);

      expect(employee.getPaymentClassification()).toBeInstanceOf(
        SalaryClassification,
      );

      expect(employee.getPaymentScheduler()).toBeInstanceOf(MonthlyScheduler);
    });

    it('WHEN execute method is called but employee id do not exist THEN throw a exeption', async () => {
      expect.assertions(1);
      try {
        await new ChangeEmployeeClassificationToSalaryUsecase(
          employeeIdDummy,
          employeeSalaryDummy,
        ).execute();
      } catch (error) {
        expect(error.message).toBe(EMPLOYEE_DO_NOT_EXIST);
      }
    });
  });
});
