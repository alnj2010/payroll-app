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
} from '../../../test/dummies';
import { EmployeeRepository } from '../infraestructure/repositories/employees/employee-repository';
import { AddServiceChargeTransaction } from './add-service-charge-transaction';
import { UnionAffiliationsRepository } from '../infraestructure/repositories/union/union-affiliation-repository';
import { AddSalaryEmployeeTransaction } from './add-salary-employee-transaction';
import { UnionAffiliation } from '../domain/union-affiliation';
import { ChangeEmployeeToUnionAffiliationTransaction } from './change-employee-to-union-affiliate-transaction';

describe('addServiceChargeTransaction class', () => {
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [],
    }).compile();
  });

  afterEach(async () => {
    EmployeeRepository.clear();
    UnionAffiliationsRepository.clear();
  });

  describe('addServiceChargeTransaction execute method', () => {
    it('When execute method is called then a service charge is added to union member', () => {
      new AddSalaryEmployeeTransaction(
        employeeId,
        employeeName,
        employeeAddress,
        employeeSalary,
      ).execute();

      new ChangeEmployeeToUnionAffiliationTransaction(
        employeeId,
        memberId,
        memberDuesRate,
      ).execute();

      const addServiceChargeTransaction = new AddServiceChargeTransaction(
        serviceChargeDate,
        memberId,
        serviceChargeAmount,
      );

      addServiceChargeTransaction.execute();

      const employee = UnionAffiliationsRepository.read(memberId);
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
