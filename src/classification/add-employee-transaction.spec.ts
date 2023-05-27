import { Test, TestingModule } from '@nestjs/testing';
import { AddSalaryEmployeeTransaction } from './add-salary-employee-transaction';
import {
  employeeAddress,
  employeeId,
  employeeName,
  employeeSalary,
  employeehourlyRate,
  employeeCommissionRate,
} from '../../test/dummies';
import { EmployeeRepository } from '../payroll-database-implementation/employee-repository';
import { SalaryClassification } from './salary-classification';
import { MonthlyScheduler } from '../schedule/monthly-scheduler';
import { HoldMethod } from '../method/hold-method';
import { Employee } from '../domain/employee';
import { HourlyClassification } from './hourly-classification';
import { WeeklyScheduler } from '../schedule/weekly-scheduler';
import { AddHourlyEmployeeTransaction } from './add-hourly-employee-transaction';
import { AddCommissionEmployeeTransaction } from './add-commission-employee-transaction';
import { CommissionClassification } from './commission-classification';
import { BiweeklyScheduler } from '../schedule/biweekly-scheduler';
import { UnionAffiliationsRepository } from '../payroll-database-implementation/union-affiliation-repository';

abstract class EmployeeAdderTester {
  protected abstract createAddEmployeeTransaction();
  protected abstract assertPaymentClassification(employee: Employee);
  protected abstract assertPaymentScheduler(employee: Employee);
  protected abstract assertPaymentMethod(employee: Employee);
  protected abstract assertCustomProperties(employee: Employee);

  test() {
    const transaction = this.createAddEmployeeTransaction();

    transaction.execute();
    const employeeRepository = EmployeeRepository.getInstance();
    const employee = employeeRepository.read(employeeId);

    expect(employee).not.toBeUndefined();

    expect(employee.getId()).toBe(employeeId);
    expect(employee.getName()).toBe(employeeName);
    expect(employee.getAddress()).toBe(employeeAddress);

    this.assertCustomProperties(employee);
    this.assertPaymentClassification(employee);
    this.assertPaymentScheduler(employee);
    this.assertPaymentMethod(employee);
  }
}

class SalaryEmployeeAdderTester extends EmployeeAdderTester {
  createAddEmployeeTransaction(): AddSalaryEmployeeTransaction {
    return new AddSalaryEmployeeTransaction(
      employeeId,
      employeeName,
      employeeAddress,
      employeeSalary,
    );
  }

  protected assertPaymentClassification(employee: Employee) {
    expect(employee.getPaymentClassification()).toBeInstanceOf(
      SalaryClassification,
    );
  }

  protected assertCustomProperties(employee: Employee) {
    const paymentClassification =
      employee.getPaymentClassification() as SalaryClassification;
    expect(paymentClassification.getSalary()).toBe(employeeSalary);
  }

  protected assertPaymentScheduler(employee: Employee) {
    expect(employee.getPaymentScheduler()).toBeInstanceOf(MonthlyScheduler);
  }
  protected assertPaymentMethod(employee: Employee) {
    expect(employee.getPaymentMethod()).toBeInstanceOf(HoldMethod);
  }
}

class HourlyEmployeeAdderTester extends EmployeeAdderTester {
  createAddEmployeeTransaction(): AddHourlyEmployeeTransaction {
    return new AddHourlyEmployeeTransaction(
      employeeId,
      employeeName,
      employeeAddress,
      employeehourlyRate,
    );
  }

  protected assertPaymentClassification(employee: Employee) {
    expect(employee.getPaymentClassification()).toBeInstanceOf(
      HourlyClassification,
    );
  }

  protected assertCustomProperties(employee: Employee) {
    const paymentClassification =
      employee.getPaymentClassification() as HourlyClassification;
    expect(paymentClassification.getHourlyRate()).toBe(employeehourlyRate);
  }

  protected assertPaymentScheduler(employee: Employee) {
    expect(employee.getPaymentScheduler()).toBeInstanceOf(WeeklyScheduler);
  }
  protected assertPaymentMethod(employee: Employee) {
    expect(employee.getPaymentMethod()).toBeInstanceOf(HoldMethod);
  }
}

class CommissionEmployeeAdderTester extends EmployeeAdderTester {
  createAddEmployeeTransaction(): AddCommissionEmployeeTransaction {
    return new AddCommissionEmployeeTransaction(
      employeeId,
      employeeName,
      employeeAddress,
      employeeSalary,
      employeeCommissionRate,
    );
  }

  protected assertPaymentClassification(employee: Employee) {
    expect(employee.getPaymentClassification()).toBeInstanceOf(
      CommissionClassification,
    );
  }

  protected assertCustomProperties(employee: Employee) {
    const paymentClassification =
      employee.getPaymentClassification() as CommissionClassification;
    expect(paymentClassification.getSalary()).toBe(employeeSalary);
    expect(paymentClassification.getCommissionRate()).toBe(
      employeeCommissionRate,
    );
  }

  protected assertPaymentScheduler(employee: Employee) {
    expect(employee.getPaymentScheduler()).toBeInstanceOf(BiweeklyScheduler);
  }
  protected assertPaymentMethod(employee: Employee) {
    expect(employee.getPaymentMethod()).toBeInstanceOf(HoldMethod);
  }
}

describe('AddEmployeeTransaction class', () => {
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

  describe('AddSalaryEmployeeTransaction execute method', () => {
    it('When execute method is called a salaryEmployee is created', () => {
      const salaryEmployeeAdderTester = new SalaryEmployeeAdderTester();
      salaryEmployeeAdderTester.test();
    });
  });

  describe('AddHourlyEmployeeTransaction execute method', () => {
    it('When execute method is called a hourlyEmployee is created', () => {
      const hourlyEmployeeAdderTester = new HourlyEmployeeAdderTester();
      hourlyEmployeeAdderTester.test();
    });
  });

  describe('AddCommissionEmployeeTransaction execute method', () => {
    it('When execute method is called a commissionEmployee is created', () => {
      const commissionEmployeeAdderTester = new CommissionEmployeeAdderTester();
      commissionEmployeeAdderTester.test();
    });
  });
});
