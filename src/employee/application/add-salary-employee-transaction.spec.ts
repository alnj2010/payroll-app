import { Test, TestingModule } from '@nestjs/testing';
import { AddSalaryEmployeeTransaction } from './add-salary-employee-transaction';
import {
  employeeAddress,
  employeeId,
  employeeName,
  employeeSalary,
} from '../../../test/dummies';
import { EmployeeRepository } from '../infraestructure/repositories/employees/employee-repository';
import { SalaryClassification } from '../domain/salary-classification';
import { MonthlyScheduler } from '../domain/monthly-scheduler';
import { HoldMethod } from '../domain/hold-method';
import { PaymentClassification } from '../domain/payment-classification';

describe('AddSalaryEmployeeTransaction class', () => {
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [],
    }).compile();
  });

  describe('constructor', () => {
    it('When execute method is called a salaryEmployee is created', () => {
      const transaction = new AddSalaryEmployeeTransaction(
        employeeId,
        employeeName,
        employeeAddress,
        employeeSalary,
      );

      transaction.execute();

      const employee = EmployeeRepository.read(employeeId);

      expect(employee).not.toBeUndefined();

      expect(employee.getId()).toBe(employeeId);
      expect(employee.getName()).toBe(employeeName);
      expect(employee.getAddress()).toBe(employeeAddress);

      expect(employee.getPaymentClassification()).toBeInstanceOf(
        SalaryClassification,
      );

      const paymentClassification =
        employee.getPaymentClassification() as SalaryClassification;

      expect(paymentClassification.getSalary()).toBe(employeeSalary);
      expect(employee.getPaymentScheduler()).toBeInstanceOf(MonthlyScheduler);
      expect(employee.getPaymentMethod()).toBeInstanceOf(HoldMethod);
    });
  });
});
