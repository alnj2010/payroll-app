import { Test, TestingModule } from '@nestjs/testing';
import {
  employeeAddress,
  employeeId,
  employeeName,
  employeeSalary,
  employeeCommissionRate,
  saleReceiptDate,
  saleReceiptAmount,
} from '../../test/dummies';
import { EmployeeRepository } from '../payroll-database-implementation/employee-repository';
import { AddCommissionEmployeeTransaction } from './add-commission-employee-transaction';
import { CommissionClassification } from './commission-classification';
import { AddSaleReceiptTransaction } from './add-sale-receipt-transaction';
import { AddSalaryEmployeeTransaction } from './add-salary-employee-transaction';
import { UnionAffiliationsRepository } from '../payroll-database-implementation/union-affiliation-repository';

describe('addSaleReceiptTransaction class', () => {
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

  describe('addSaleReceiptTransaction execute method', () => {
    it('When execute method is called then a time card is added to Commission Employee', () => {
      new AddCommissionEmployeeTransaction(
        employeeId,
        employeeName,
        employeeAddress,
        employeeSalary,
        employeeCommissionRate,
      ).execute();

      const employee = employeeRepository.read(employeeId);
      const classification =
        employee.getPaymentClassification() as CommissionClassification;

      const addSaleReceiptTransaction = new AddSaleReceiptTransaction(
        employee.getId(),
        saleReceiptDate,
        saleReceiptAmount,
      );

      addSaleReceiptTransaction.execute();

      const saleReceipt = classification.getSaleReceipt(saleReceiptDate);

      expect(saleReceipt.getDate()).toEqual(saleReceiptDate);
      expect(saleReceipt.getAmount()).toEqual(saleReceiptAmount);
    });

    it('When execute method is called but employee is not founded then occurs a exeception', () => {
      const addSaleReceiptTransaction = new AddSaleReceiptTransaction(
        employeeId,
        saleReceiptDate,
        saleReceiptAmount,
      );

      expect.assertions(1);
      try {
        addSaleReceiptTransaction.execute();
      } catch (error) {
        expect(error.message).toBe('Employee not found');
      }
    });

    it('When execute method is called but employee classification is different to Commission then occurs a exeception', () => {
      new AddSalaryEmployeeTransaction(
        employeeId,
        employeeName,
        employeeAddress,
        employeeSalary,
      ).execute();

      const employee = employeeRepository.read(employeeId);

      const addSaleReceiptTransaction = new AddSaleReceiptTransaction(
        employee.getId(),
        saleReceiptDate,
        saleReceiptAmount,
      );

      expect.assertions(1);
      try {
        addSaleReceiptTransaction.execute();
      } catch (error) {
        expect(error.message).toBe(
          'The Employee is not commission payment classification',
        );
      }
    });
  });
});