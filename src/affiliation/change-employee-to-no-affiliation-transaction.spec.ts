import { Test, TestingModule } from '@nestjs/testing';
import {
  employeeAddress,
  employeeId,
  employeeName,
  employeehourlyRate,
  memberId,
  memberDuesRate,
} from '../../test/dummies';
import { EmployeeRepository } from '../payroll-database-implementation/employee-repository';
import { AddHourlyEmployeeTransaction } from '../classification/add-hourly-employee-transaction';
import { UnionAffiliationsRepository } from '../payroll-database-implementation/union-affiliation-repository';
import { ChangeEmployeeToUnionAffiliationTransaction } from './change-employee-to-union-affiliate-transaction';
import { ChangeEmployeeToNoAffiliationTransaction } from './change-employee-to-no-affiliation-transaction';
import { NoAffiliation } from './no-affiliation';

describe('ChangeEmployeeToNoAffiliationTransaction class', () => {
  const employeeRepository = new EmployeeRepository();
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

  describe('ChangeEmployeeToNoAffiliationTransaction execute method', () => {
    it('When execute method is called then the employee affiliation is updated to no affiliation', () => {
      new AddHourlyEmployeeTransaction(
        employeeId,
        employeeName,
        employeeAddress,
        employeeRepository,
        employeehourlyRate,
      ).execute();

      new ChangeEmployeeToUnionAffiliationTransaction(
        employeeId,
        employeeRepository,
        memberId,
        memberDuesRate,
      ).execute();

      const transaction = new ChangeEmployeeToNoAffiliationTransaction(
        employeeId,
        employeeRepository,
      );
      transaction.execute();

      try {
        unionAffiliationRepository.read(memberId);
      } catch (error) {
        const employee = employeeRepository.read(employeeId);
        const affiliation = employee.getAffiliation();
        expect(employee.getId()).toEqual(employeeId);
        expect(affiliation).toBeInstanceOf(NoAffiliation);
      }
    });
  });

  it('When execute method is called but employee is not founded then occurs a exeception', () => {
    const transaction = new ChangeEmployeeToUnionAffiliationTransaction(
      employeeId,
      employeeRepository,
      memberId,
      memberDuesRate,
    );

    expect.assertions(1);
    try {
      transaction.execute();
    } catch (error) {
      expect(error.message).toBe('Employee not found');
    }
  });
});
