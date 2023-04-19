import { Test, TestingModule } from '@nestjs/testing';
import {
  employeeAddress,
  employeeId,
  employeeName,
  employeeSalary,
  employeeCommissionRate,
} from '../../../test/dummies';
import { EmployeeRepository } from '../infraestructure/repositories/employees/employee-repository';
import { ChangeEmployeeToCommissionPaymentTransaction } from './change-employee-to-commission-payment-transaction';
import { AddSalaryEmployeeTransaction } from './add-salary-employee-transaction';
import { CommissionClassification } from '../domain/commission-classification';
import { BiweeklyScheduler } from '../domain/biweekly-scheduler';

describe('ChangeEmployeeToCommissionPaymentTransaction class', () => {
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [],
    }).compile();
  });

  afterEach(async () => {
    EmployeeRepository.clear();
  });

  describe('ChangeEmployeeToCommissionPaymentTransaction execute method', () => {
    it('When execute method is called then the employee payment is updated to commission', () => {
      new AddSalaryEmployeeTransaction(
        employeeId,
        employeeName,
        employeeAddress,
        employeeSalary,
      ).execute();

      const transaction = new ChangeEmployeeToCommissionPaymentTransaction(
        employeeId,
        employeeSalary,
        employeeCommissionRate,
      );
      transaction.execute();

      const employee = EmployeeRepository.read(employeeId);

      expect(employee.getId()).toEqual(employeeId);
      expect(employee.getPaymentClassification()).toBeInstanceOf(
        CommissionClassification,
      );
      expect(employee.getPaymentScheduler()).toBeInstanceOf(BiweeklyScheduler);
    });
  });

  it('When execute method is called but employee is not founded then occurs a exeception', () => {
    const transaction = new ChangeEmployeeToCommissionPaymentTransaction(
      employeeId,
      employeeSalary,
      employeeCommissionRate,
    );

    expect.assertions(1);
    try {
      transaction.execute();
    } catch (error) {
      expect(error.message).toBe('Employee not found');
    }
  });
});
