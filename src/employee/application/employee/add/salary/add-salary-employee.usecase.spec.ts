import { Employee } from '../../../../domain/employee';
import { SalaryClassification } from '../../../../domain/payment-classification/salary-classification';
import { HoldMethod } from '../../../../domain/payment-method/hold-method';
import { MonthlyScheduler } from '../../../../domain/payment-scheduler/monthly-scheduler';
import { PayrollRepository } from '../../../../infraestructure/repositories/payroll.repository';
import { AddSalaryEmployeeUsecase } from './add-salary-employee.usecase';
import {
  employeeAddressDummy,
  employeeIdDummy,
  employeeNameDummy,
  employeeSalaryDummy,
} from '../../../../../../test/dummies';
import { NoAffiliation } from '../../../../domain/affiliations/no-affiliation';

describe('AddSalaryEmployee usecase ', () => {
  describe('execute method', () => {
    afterEach(async () => {
      await PayrollRepository.clear();
    });

    it('WHEN execute method is called THEN a salary employee should be added', async () => {
      const addSalaryEmployeeUsecase = new AddSalaryEmployeeUsecase(
        employeeIdDummy,
        employeeNameDummy,
        employeeAddressDummy,
        employeeSalaryDummy,
      );

      await addSalaryEmployeeUsecase.execute();

      const employee: Employee = await PayrollRepository.getEmployee(
        employeeIdDummy,
      );

      expect(employee.getId()).toBe(employeeIdDummy);
      expect(employee.getName()).toBe(employeeNameDummy);
      expect(employee.getAddress()).toBe(employeeAddressDummy);

      expect(employee.getPaymentClassification()).toBeInstanceOf(
        SalaryClassification,
      );
      expect(employee.getPaymentMethod()).toBeInstanceOf(HoldMethod);
      expect(employee.getPaymentScheduler()).toBeInstanceOf(MonthlyScheduler);
      expect(employee.getAffiliation()).toBeInstanceOf(NoAffiliation);
    });
  });
});
