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

describe('ChangeEmployeeToMailMethodTransaction class', () => {
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [],
    }).compile();
  });

  afterEach(async () => {
    EmployeeRepository.clear();
  });

  describe('ChangeEmployeeToMailMethodTransaction execute method', () => {
    it('When execute method is called then the employee method is updated to mail', () => {
      new AddHourlyEmployeeTransaction(
        employeeId,
        employeeName,
        employeeAddress,
        employeehourlyRate,
      ).execute();

      const transaction = new ChangeEmployeeToMailMethodTransaction(
        employeeId,
        employeeMailAddress,
      );
      transaction.execute();

      const employee = EmployeeRepository.read(employeeId);
      const paymentMethod = employee.getPaymentMethod() as MailMethod;

      expect(employee.getId()).toEqual(employeeId);
      expect(employee.getPaymentMethod()).toBeInstanceOf(MailMethod);
      expect(paymentMethod.getMail()).toEqual(employeeMailAddress);
    });
  });

  it('When execute method is called but employee is not founded then occurs a exeception', () => {
    const transaction = new ChangeEmployeeToMailMethodTransaction(
      employeeId,
      employeeMailAddress,
    );

    expect.assertions(1);
    try {
      transaction.execute();
    } catch (error) {
      expect(error.message).toBe('Employee not found');
    }
  });
});
