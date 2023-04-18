import { Test, TestingModule } from '@nestjs/testing';
import {
  employeeAddress,
  employeeId,
  employeeName,
  employeeAddress2,
  employeehourlyRate,
} from '../../../test/dummies';
import { EmployeeRepository } from '../infraestructure/repositories/employees/employee-repository';
import { AddHourlyEmployeeTransaction } from './add-hourly-employee-transaction';
import { ChangeEmployeeAddressTransaction } from './change-employee-address-transaction';

describe('ChangeEmployeeAddressTransaction class', () => {
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [],
    }).compile();
  });

  afterEach(async () => {
    EmployeeRepository.clear();
  });

  describe('ChangeEmployeeAddressTransaction execute method', () => {
    it('When execute method is called then the employee name is updated', () => {
      new AddHourlyEmployeeTransaction(
        employeeId,
        employeeName,
        employeeAddress,
        employeehourlyRate,
      ).execute();

      const transaction = new ChangeEmployeeAddressTransaction(
        employeeId,
        employeeAddress2,
      );
      transaction.execute();

      const employee = EmployeeRepository.read(employeeId);

      expect(employee.getAddress()).toEqual(employeeAddress2);
      expect(employee.getId()).toEqual(employeeId);
    });
  });

  it('When execute method is called but employee is not founded then occurs a exeception', () => {
    const transaction = new ChangeEmployeeAddressTransaction(
      employeeId,
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
