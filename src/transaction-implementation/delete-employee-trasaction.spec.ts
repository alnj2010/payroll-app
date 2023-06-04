import { Test, TestingModule } from '@nestjs/testing';
import { AddSalaryEmployeeTransaction } from './add-salary-employee-transaction';
import {
  employeeAddress,
  employeeId,
  employeeName,
  employeeSalary,
} from '../../test/dummies';
import { EmployeeRepository } from '../payroll-repository-implementation/employee-repository';
import { DeleteEmployeeTransaction } from './delete-employee-transaction';
import { Employee } from '../payroll-domain/employee';
import { PayrollFactoryImplementation } from '../payroll-implementations/payroll-factory-implementation';

describe('deleteEmployeeTransaction class', () => {
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

  describe('deleteSalaryEmployeeTransaction execute method', () => {
    it('When execute method is called a employee is deleted', () => {
      const addEmployeeTransaction = new AddSalaryEmployeeTransaction(
        employeeId,
        employeeName,
        employeeAddress,
        employeeRepository,
        payrollFactory,
        employeeSalary,
      );
      addEmployeeTransaction.execute();
      expect(employeeRepository.read(employeeId)).toBeInstanceOf(Employee);

      const deleteEmployeeTransaction = new DeleteEmployeeTransaction(
        employeeId,
        employeeRepository,
      );

      deleteEmployeeTransaction.execute();

      expect.assertions(2);
      try {
        employeeRepository.read(employeeId);
      } catch (error) {
        expect(error.message).toBe('Employee not found');
      }
    });
  });
});
