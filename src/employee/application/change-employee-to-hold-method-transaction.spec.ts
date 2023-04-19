import { Test, TestingModule } from '@nestjs/testing';
import {
  employeeAddress,
  employeeId,
  employeeName,
  employeehourlyRate,
  employeeMailAddress,
} from '../../../test/dummies';
import { EmployeeRepository } from '../infraestructure/repositories/employees/employee-repository';
import { ChangeEmployeeToMailMethodTransaction } from './change-employee-to-mail-method-transaction';
import { AddHourlyEmployeeTransaction } from './add-hourly-employee-transaction';
import { MailMethod } from '../domain/mail-method';
import { HoldMethod } from '../domain/hold-method';
import { ChangeEmployeeToHoldMethodTransaction } from './change-employee-to-hold-method-transaction';

describe('ChangeEmployeeToHoldMethodTransaction class', () => {
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [],
    }).compile();
  });

  afterEach(async () => {
    EmployeeRepository.clear();
  });

  describe('ChangeEmployeeToHoldMethodTransaction execute method', () => {
    it('When execute method is called then the employee method is updated to hold', () => {
      new AddHourlyEmployeeTransaction(
        employeeId,
        employeeName,
        employeeAddress,
        employeehourlyRate,
      ).execute();

      new ChangeEmployeeToMailMethodTransaction(
        employeeId,
        employeeMailAddress,
      ).execute();

      const employee = EmployeeRepository.read(employeeId);

      expect(employee.getPaymentMethod()).toBeInstanceOf(MailMethod);

      const transaction = new ChangeEmployeeToHoldMethodTransaction(employeeId);
      transaction.execute();

      expect(employee.getId()).toEqual(employeeId);
      expect(employee.getPaymentMethod()).toBeInstanceOf(HoldMethod);
    });
  });

  it('When execute method is called but employee is not founded then occurs a exeception', () => {
    const transaction = new ChangeEmployeeToHoldMethodTransaction(employeeId);

    expect.assertions(1);
    try {
      transaction.execute();
    } catch (error) {
      expect(error.message).toBe('Employee not found');
    }
  });
});
