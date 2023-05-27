import { Test, TestingModule } from '@nestjs/testing';
import { AddSalaryEmployeeTransaction } from '../classification/add-salary-employee-transaction';
import {
  employeeAddress,
  employeeId,
  employeeName,
  employeeSalary,
} from '../../test/dummies';
import { EmployeeRepository } from '../payroll-database-implementation/employee-repository';
import { DeleteEmployeeTransaction } from './delete-employee-transaction';
import { Employee } from '../domain/employee';
import { UnionAffiliationsRepository } from '../payroll-database-implementation/union-affiliation-repository';

describe('deleteEmployeeTransaction class', () => {
  const employeeRepository = EmployeeRepository.getInstance();
  const unionAffiliationRepository = UnionAffiliationsRepository.getInstance();
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [],
    }).compile();
  });

  afterEach(async () => {
    employeeRepository.clear();
    unionAffiliationRepository.clear();
  });

  describe('deleteSalaryEmployeeTransaction execute method', () => {
    it('When execute method is called a employee is deleted', () => {
      const addEmployeeTransaction = new AddSalaryEmployeeTransaction(
        employeeId,
        employeeName,
        employeeAddress,
        employeeSalary,
      );
      addEmployeeTransaction.execute();
      expect(employeeRepository.read(employeeId)).toBeInstanceOf(Employee);

      const deleteEmployeeTransaction = new DeleteEmployeeTransaction(
        employeeId,
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
