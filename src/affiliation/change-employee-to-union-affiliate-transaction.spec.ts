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
import { UnionAffiliation } from './union-affiliation';
import { ChangeEmployeeToUnionAffiliationTransaction } from './change-employee-to-union-affiliate-transaction';

describe('ChangeEmployeeToUnionAffiliationTransaction class', () => {
  const employeeRepository = new EmployeeRepository();
  const unionAffiliationRepository = new UnionAffiliationsRepository();
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [],
    }).compile();
  });

  afterEach(async () => {
    employeeRepository.clear();
    unionAffiliationRepository.clear();
  });

  describe('ChangeEmployeeToUnionAffiliationTransaction execute method', () => {
    it('When execute method is called then the employee affiliation is updated to Union', () => {
      new AddHourlyEmployeeTransaction(
        employeeId,
        employeeName,
        employeeAddress,
        employeeRepository,
        employeehourlyRate,
      ).execute();

      const transaction = new ChangeEmployeeToUnionAffiliationTransaction(
        employeeId,
        employeeRepository,
        unionAffiliationRepository,
        memberId,
        memberDuesRate,
      );
      transaction.execute();

      const employee = unionAffiliationRepository.read(memberId);
      const affiliation = employee.getAffiliation() as UnionAffiliation;
      expect(employee.getId()).toEqual(employeeId);
      expect(affiliation).toBeInstanceOf(UnionAffiliation);
      expect(affiliation.getDueRate()).toBe(memberDuesRate);
      expect(affiliation.getMemberId()).toBe(memberId);
    });
  });

  it('When execute method is called but employee is not founded then occurs a exeception', () => {
    const transaction = new ChangeEmployeeToUnionAffiliationTransaction(
      employeeId,
      employeeRepository,
      unionAffiliationRepository,
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
