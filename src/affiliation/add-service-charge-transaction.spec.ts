import { Test, TestingModule } from '@nestjs/testing';
import {
  employeeAddress,
  employeeId,
  employeeName,
  employeeSalary,
  memberDuesRate,
  memberId,
  serviceChargeAmount,
  serviceChargeDate,
} from '../../test/dummies';
import { EmployeeRepository } from '../payroll-database-implementation/employee-repository';
import { AddServiceChargeTransaction } from './add-service-charge-transaction';
import { UnionAffiliationsRepository } from '../payroll-database-implementation/union-affiliation-repository';
import { AddSalaryEmployeeTransaction } from '../classification/add-salary-employee-transaction';
import { UnionAffiliation } from './union-affiliation';
import { ChangeEmployeeToUnionAffiliationTransaction } from './change-employee-to-union-affiliate-transaction';

describe('addServiceChargeTransaction class', () => {
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

  describe('addServiceChargeTransaction execute method', () => {
    it('When execute method is called then a service charge is added to union member', () => {
      new AddSalaryEmployeeTransaction(
        employeeId,
        employeeName,
        employeeAddress,
        employeeRepository,
        employeeSalary,
      ).execute();

      new ChangeEmployeeToUnionAffiliationTransaction(
        employeeId,
        employeeRepository,
        unionAffiliationRepository,
        memberId,
        memberDuesRate,
      ).execute();

      const addServiceChargeTransaction = new AddServiceChargeTransaction(
        serviceChargeDate,
        memberId,
        serviceChargeAmount,
        unionAffiliationRepository,
      );

      addServiceChargeTransaction.execute();

      const employee = unionAffiliationRepository.read(memberId);
      const affiliation = employee.getAffiliation() as UnionAffiliation;
      const serviceCharge = affiliation.getServiceCharge(serviceChargeDate);

      expect(serviceCharge.getAmount()).toBe(serviceChargeAmount);
      expect(serviceCharge.getDate()).toBe(serviceChargeDate);
    });

    it('When execute method is called but affiliation is not founded then occurs a exeception', () => {
      const addServiceChargeTransaction = new AddServiceChargeTransaction(
        serviceChargeDate,
        memberId,
        serviceChargeAmount,
        unionAffiliationRepository,
      );

      expect.assertions(1);
      try {
        addServiceChargeTransaction.execute();
      } catch (error) {
        expect(error.message).toBe('UnionAffiliation not found');
      }
    });
  });
});
