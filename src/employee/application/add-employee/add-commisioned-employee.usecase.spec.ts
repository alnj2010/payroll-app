import { Employee } from '../../domain/employee';
import { HoldMethod } from '../../domain/payment-method/hold-method';
import { PayrollRepository } from '../../infraestructure/repositories/payroll.repository';
import {
  employeeAddressDummy,
  employeeCommissionRateDummy,
  employeeIdDummy,
  employeeNameDummy,
  employeeSalaryDummy,
} from '../../../../test/dummies';
import { BiweeklyScheduler } from '../../domain/payment-scheduler/biweekly-scheduler';
import { AddCommissionedEmployeeUsecase } from './add-commissioned-employee.usecase';
import { CommissionClassification } from '../../domain/payment-classification/commission-classification';

describe('AddCommissionedEmployee usecase ', () => {
  describe('execute method', () => {
    it('WHEN execute method is called THEN a commissioned employee should be added', () => {
      const addCommissionedEmployeeUsecase = new AddCommissionedEmployeeUsecase(
        employeeIdDummy,
        employeeNameDummy,
        employeeAddressDummy,
        employeeSalaryDummy,
        employeeCommissionRateDummy,
      );

      addCommissionedEmployeeUsecase.execute();

      const employee: Employee = PayrollRepository.getEmployee(employeeIdDummy);

      expect(employee.getId()).toBe(employeeIdDummy);
      expect(employee.getName()).toBe(employeeNameDummy);
      expect(employee.getAddress()).toBe(employeeAddressDummy);

      expect(employee.getPaymentClassification()).toBeInstanceOf(
        CommissionClassification,
      );
      expect(employee.getPaymentMethod()).toBeInstanceOf(HoldMethod);
      expect(employee.getPaymentScheduler()).toBeInstanceOf(BiweeklyScheduler);
    });
  });
});
