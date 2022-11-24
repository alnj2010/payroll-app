import {
  employeeAddressDummy,
  employeeIdDummy,
  employeeNameDummy,
  employeeHourlyRateDummy,
} from '../../../../test/dummies';
import { Employee } from '../../domain/employee';
import { HourlyClassification } from '../../domain/payment-classification/hourly-classification';
import { HoldMethod } from '../../domain/payment-method/hold-method';
import { WeeklyScheduler } from '../../domain/payment-scheduler/weekly-schedule';
import { PayrollRepository } from '../../infraestructure/repositories/payroll.repository';
import { AddHourlyEmployeeUsecase } from './add-hourly-employee.usecase';

describe('AddHourlyEmployee usecase ', () => {
  describe('execute method', () => {
    it('WHEN execute method is called THEN a hourly employee should be added', () => {
      const addHourlyEmployeeUsecase = new AddHourlyEmployeeUsecase(
        employeeIdDummy,
        employeeNameDummy,
        employeeAddressDummy,
        employeeHourlyRateDummy,
      );

      addHourlyEmployeeUsecase.execute();

      const employee: Employee = PayrollRepository.getEmployee(employeeIdDummy);

      expect(employee.getId()).toBe(employeeIdDummy);
      expect(employee.getName()).toBe(employeeNameDummy);
      expect(employee.getAddress()).toBe(employeeAddressDummy);

      expect(employee.getPaymentClassification()).toBeInstanceOf(
        HourlyClassification,
      );
      expect(employee.getPaymentMethod()).toBeInstanceOf(HoldMethod);
      expect(employee.getPaymentScheduler()).toBeInstanceOf(WeeklyScheduler);
    });
  });
});
