import { Test, TestingModule } from '@nestjs/testing';
import {
  employeeAddress,
  employeeId,
  employeeName,
  employeehourlyRate,
  employeeSalary,
} from '../../test/dummies';
import { EmployeeRepository } from '../payroll-repository-implementation/employee-repository';
import { ChangeEmployeeToSalaryClassificationTransaction } from './change-employee-to-salary-classification-transaction';
import { AddHourlyEmployeeTransaction } from './add-hourly-employee-transaction';
import { SalaryClassification } from '../payroll-implementations/salary-classification';
import { MonthlyScheduler } from '../payroll-implementations/monthly-scheduler';
import { PayrollFactoryImplementation } from '../payroll-implementations/payroll-factory-implementation';

describe('ChangeEmployeeToSalaryClassificationTransaction class', () => {
  const employeeRepository = new EmployeeRepository();
  const payrollFactory = new PayrollFactoryImplementation();

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [],
    }).compile();
  });

  afterEach(async () => {
    employeeRepository.clear();
  });

  describe('ChangeEmployeeToSalaryClassificationTransaction execute method', () => {
    it('When execute method is called then the employee payment is updated to salary', () => {
      new AddHourlyEmployeeTransaction(
        employeeId,
        employeeName,
        employeeAddress,
        employeeRepository,
        payrollFactory,
        employeehourlyRate,
      ).execute();

      const transaction = new ChangeEmployeeToSalaryClassificationTransaction(
        employeeId,
        employeeRepository,
        payrollFactory,
        employeeSalary,
      );
      transaction.execute();

      const employee = employeeRepository.read(employeeId);

      expect(employee.getId()).toEqual(employeeId);
      expect(employee.getPaymentClassification()).toBeInstanceOf(
        SalaryClassification,
      );
      expect(employee.getPaymentScheduler()).toBeInstanceOf(MonthlyScheduler);
    });
  });

  it('When execute method is called but employee is not founded then occurs a exeception', () => {
    const transaction = new ChangeEmployeeToSalaryClassificationTransaction(
      employeeId,
      employeeRepository,
      payrollFactory,
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
