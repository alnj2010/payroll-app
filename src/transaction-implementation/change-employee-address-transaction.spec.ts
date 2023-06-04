import { Test, TestingModule } from '@nestjs/testing';
import {
  employeeAddress,
  employeeId,
  employeeName,
  employeeAddress2,
  employeehourlyRate,
} from '../../test/dummies';
import { EmployeeRepository } from '../payroll-repository-implementation/employee-repository';
import { AddHourlyEmployeeTransaction } from './add-hourly-employee-transaction';
import { ChangeEmployeeAddressTransaction } from './change-employee-address-transaction';
import { PayrollFactoryImplementation } from '../payroll-implementations/payroll-factory-implementation';

describe('ChangeEmployeeAddressTransaction class', () => {
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

  describe('ChangeEmployeeAddressTransaction execute method', () => {
    it('When execute method is called then the employee name is updated', () => {
      new AddHourlyEmployeeTransaction(
        employeeId,
        employeeName,
        employeeAddress,
        employeeRepository,
        payrollFactory,
        employeehourlyRate,
      ).execute();

      const transaction = new ChangeEmployeeAddressTransaction(
        employeeId,
        employeeRepository,
        employeeAddress2,
      );
      transaction.execute();

      const employee = employeeRepository.read(employeeId);

      expect(employee.getAddress()).toEqual(employeeAddress2);
      expect(employee.getId()).toEqual(employeeId);
    });
  });

  it('When execute method is called but employee is not founded then occurs a exeception', () => {
    const transaction = new ChangeEmployeeAddressTransaction(
      employeeId,
      employeeRepository,
      employeeAddress2,
    );

    expect.assertions(1);
    try {
      transaction.execute();
    } catch (error) {
      expect(error.message).toBe('Employee not found');
    }
  });
});
