import { Test, TestingModule } from '@nestjs/testing';
import {
  employeeAddress,
  employeeId,
  employeeName,
  employeehourlyRate,
  employeeSalary,
} from '../../../test/dummies';
import { EmployeeRepository } from '../infraestructure/repositories/employees/employee-repository';
import { ChangeEmployeeToSalaryPaymentTransaction } from './change-employee-to-salary-payment-transaction';
import { AddHourlyEmployeeTransaction } from './add-hourly-employee-transaction';
import { SalaryClassification } from '../domain/salary-classification';
import { MonthlyScheduler } from '../domain/monthly-scheduler';

describe('ChangeEmployeeToSalaryPaymentTransaction class', () => {
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [],
    }).compile();
  });

  afterEach(async () => {
    EmployeeRepository.clear();
  });

  describe('ChangeEmployeeToSalaryPaymentTransaction execute method', () => {
    it('When execute method is called then the employee payment is updated to salary', () => {
      new AddHourlyEmployeeTransaction(
        employeeId,
        employeeName,
        employeeAddress,
        employeehourlyRate,
      ).execute();

      const transaction = new ChangeEmployeeToSalaryPaymentTransaction(
        employeeId,
        employeeSalary,
      );
      transaction.execute();

      const employee = EmployeeRepository.read(employeeId);

      expect(employee.getId()).toEqual(employeeId);
      expect(employee.getPaymentClassification()).toBeInstanceOf(
        SalaryClassification,
      );
      expect(employee.getPaymentScheduler()).toBeInstanceOf(MonthlyScheduler);
    });
  });

  it('When execute method is called but employee is not founded then occurs a exeception', () => {
    const transaction = new ChangeEmployeeToSalaryPaymentTransaction(
      employeeId,
      employeeSalary,
    );

    expect.assertions(1);
    try {
      transaction.execute();
    } catch (error) {
      expect(error.message).toBe('Employee not found');
    }
  });
});
