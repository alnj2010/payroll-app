import {
  employeeAddressDummy,
  employeeCommissionRateDummy,
  employeeHourlyRateDummy,
  employeeIdDummy,
  employeeNameDummy,
  employeeSalaryDummy,
} from '../../../../../../../test/dummies';
import { PayrollRepository } from '../../../../../infraestructure/repositories/payroll.repository';
import { EMPLOYEE_DO_NOT_EXIST } from '../../../../../domain/errors/custom-messages';
import { ChangeEmployeeClassificationToCommissionUsecase } from './change-employee-classification-to-commission.usecase';
import { CommissionClassification } from '../../../../../domain/payment-classification/commission-classification';
import { AddHourlyEmployeeUsecase } from '../../../add/hourly/add-hourly-employee.usecase';

describe('ChangeNameEmployee usecase ', () => {
  describe('execute method', () => {
    afterEach(async () => {
      await PayrollRepository.clear();
    });

    it('WHEN execute method is called THEN employee classification should be changed to commission', async () => {
      await new AddHourlyEmployeeUsecase(
        employeeIdDummy,
        employeeNameDummy,
        employeeAddressDummy,
        employeeHourlyRateDummy,
      ).execute();

      await new ChangeEmployeeClassificationToCommissionUsecase(
        employeeIdDummy,
        employeeSalaryDummy,
        employeeCommissionRateDummy,
      ).execute();

      const employee = await PayrollRepository.getEmployee(employeeIdDummy);

      expect(employee.getPaymentClassification()).toBeInstanceOf(
        CommissionClassification,
      );
    });

    it('WHEN execute method is called but employee id do not exist THEN throw a exeption', async () => {
      expect.assertions(1);
      try {
        await new ChangeEmployeeClassificationToCommissionUsecase(
          employeeIdDummy,
          employeeSalaryDummy,
          employeeCommissionRateDummy,
        ).execute();
      } catch (error) {
        expect(error.message).toBe(EMPLOYEE_DO_NOT_EXIST);
      }
    });
  });
});
