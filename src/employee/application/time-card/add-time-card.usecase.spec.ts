import {
  employeeAddressDummy,
  employeeHourlyRateDummy,
  employeeIdDummy,
  employeeNameDummy,
  errorDummy,
  timeCardDateDummy,
  timeCardHoursDummy,
} from '../../../../test/dummies';
import { AddHourlyEmployeeUsecase } from '../employee/add/hourly/add-hourly-employee.usecase';
import { AddTimeCardUsecase } from './add-time-card.usecase';
import { PayrollRepository } from '../../infraestructure/repositories/payroll.repository';
import { HourlyClassification } from '../../domain/payment-classification/hourly-classification';
import { AddSalaryEmployeeUsecase } from '../employee/add/salary/add-salary-employee.usecase';
import {
  EMPLOYEE_DO_NOT_EXIST,
  EMPLOYEE_IS_NOT_HOURLY_CLASSIFICATION,
} from '../../domain/errors/custom-messages';

describe('addTimeCard usecase ', () => {
  describe('execute method', () => {
    afterEach(async () => {
      await PayrollRepository.clear();
    });

    it('WHEN execute method is called THEN a time card should be added', async () => {
      await new AddHourlyEmployeeUsecase(
        employeeIdDummy,
        employeeNameDummy,
        employeeAddressDummy,
        employeeHourlyRateDummy,
      ).execute();

      const addTimeCard = new AddTimeCardUsecase(
        employeeIdDummy,
        timeCardDateDummy,
        timeCardHoursDummy,
      );

      await addTimeCard.execute();

      const employeeHourlyClassification: HourlyClassification = (
        await PayrollRepository.getEmployee(employeeIdDummy)
      ).getPaymentClassification() as HourlyClassification;

      expect(employeeHourlyClassification.getTimeCards().length).toBe(1);
      expect(employeeHourlyClassification.getTimeCards()[0].getDate()).toEqual(
        timeCardDateDummy,
      );
      expect(employeeHourlyClassification.getTimeCards()[0].getHours()).toEqual(
        timeCardHoursDummy,
      );
    });

    it('WHEN execute method is called but employee id is not hourly classification THEN throw a exeption', async () => {
      await new AddSalaryEmployeeUsecase(
        employeeIdDummy,
        employeeNameDummy,
        employeeAddressDummy,
        employeeHourlyRateDummy,
      ).execute();

      const addTimeCard = new AddTimeCardUsecase(
        employeeIdDummy,
        timeCardDateDummy,
        timeCardHoursDummy,
      );

      expect.assertions(1);
      try {
        await addTimeCard.execute();
      } catch (error) {
        expect(error.message).toBe(EMPLOYEE_IS_NOT_HOURLY_CLASSIFICATION);
      }
    });

    it('WHEN execute method is called but employee id do not exist THEN throw a exeption', async () => {
      const addTimeCard = new AddTimeCardUsecase(
        employeeIdDummy,
        timeCardDateDummy,
        timeCardHoursDummy,
      );

      expect.assertions(1);
      try {
        await addTimeCard.execute();
      } catch (error) {
        expect(error.message).toBe(EMPLOYEE_DO_NOT_EXIST);
      }
    });

    it('WHEN execute method is called but occurrs db error THEN throw a exeption', async () => {
      jest
        .spyOn(PayrollRepository, 'getEmployee')
        .mockRejectedValue(errorDummy);

      const addTimeCard = new AddTimeCardUsecase(
        employeeIdDummy,
        timeCardDateDummy,
        timeCardHoursDummy,
      );

      expect.assertions(1);
      try {
        await addTimeCard.execute();
      } catch (error) {
        expect(error).toEqual(errorDummy);
      }
    });
  });
});
