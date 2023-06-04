import { Test, TestingModule } from '@nestjs/testing';
import {
  employeeAddress,
  employeeId,
  employeeName,
  employeehourlyRate,
  employeeBank,
  employeeBankAccount,
} from '../../test/dummies';
import { EmployeeRepository } from '../payroll-repository-implementation/employee-repository';
import { ChangeEmployeeToDirectMethodTransaction } from './change-employee-to-direct-method-transaction';
import { AddHourlyEmployeeTransaction } from './add-hourly-employee-transaction';
import { DirectMethod } from '../payroll-implementations/direct-method';
import { PayrollFactoryImplementation } from '../payroll-implementations/payroll-factory-implementation';

describe('ChangeEmployeeToDirectMethodTransaction class', () => {
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

  describe('ChangeEmployeeToDirectMethodTransaction execute method', () => {
    it('When execute method is called then the employee method is updated to direct', () => {
      new AddHourlyEmployeeTransaction(
        employeeId,
        employeeName,
        employeeAddress,
        employeeRepository,
        payrollFactory,
        employeehourlyRate,
      ).execute();

      const transaction = new ChangeEmployeeToDirectMethodTransaction(
        employeeId,
        employeeRepository,
        payrollFactory,
        employeeBank,
        employeeBankAccount,
      );
      transaction.execute();

      const employee = employeeRepository.read(employeeId);
      const paymentMethod = employee.getPaymentMethod() as DirectMethod;

      expect(employee.getId()).toEqual(employeeId);
      expect(employee.getPaymentMethod()).toBeInstanceOf(DirectMethod);
      expect(paymentMethod.getAccount()).toEqual(employeeBankAccount);
      expect(paymentMethod.getBank()).toEqual(employeeBank);
    });
  });

  it('When execute method is called but employee is not founded then occurs a exeception', () => {
    const transaction = new ChangeEmployeeToDirectMethodTransaction(
      employeeId,
      employeeRepository,
      payrollFactory,
      employeeBank,
      employeeBankAccount,
    );

    expect.assertions(1);
    try {
      transaction.execute();
    } catch (error) {
      expect(error.message).toBe('Employee not found');
    }
  });
});
