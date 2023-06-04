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
import { EmployeeRepository } from '../payroll-repository-implementation/employee-repository';
import { SalaryClassification } from '../payroll-implementations/salary-classification';
import { MonthlyScheduler } from '../payroll-implementations/monthly-scheduler';
import { HoldMethod } from '../payroll-implementations/hold-method';
import { Employee } from '../payroll-domain/employee';
import { HourlyClassification } from '../payroll-implementations/hourly-classification';
import { WeeklyScheduler } from '../payroll-implementations/weekly-scheduler';
import { AddHourlyEmployeeTransaction } from './add-hourly-employee-transaction';
import { AddCommissionEmployeeTransaction } from './add-commission-employee-transaction';
import { CommissionClassification } from '../payroll-implementations/commission-classification';
import { BiweeklyScheduler } from '../payroll-implementations/biweekly-scheduler';
import { ERepository } from '../payroll-repository/e-repository';
import { PayrollFactoryImplementation } from '../payroll-implementations/payroll-factory-implementation';
import { PayrollFactory } from '../payroll-factory/payroll-factory';

abstract class EmployeeAdderTester {
  constructor(protected employeeRepository: ERepository) {}

  protected abstract createAddEmployeeTransaction();
  protected abstract assertPaymentClassification(employee: Employee);
  protected abstract assertPaymentScheduler(employee: Employee);
  protected abstract assertPaymentMethod(employee: Employee);
  protected abstract assertCustomProperties(employee: Employee);

  test() {
    const transaction = this.createAddEmployeeTransaction();

    transaction.execute();
    const employee = this.employeeRepository.read(employeeId);

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
  constructor(
    employeeRepository: ERepository,
    private payrollFactory: PayrollFactory,
  ) {
    super(employeeRepository);
  }

  createAddEmployeeTransaction(): AddSalaryEmployeeTransaction {
    return new AddSalaryEmployeeTransaction(
      employeeId,
      employeeName,
      employeeAddress,
      this.employeeRepository,
      this.payrollFactory,
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
  constructor(
    employeeRepository: ERepository,
    private payrollFactory: PayrollFactory,
  ) {
    super(employeeRepository);
  }

  createAddEmployeeTransaction(): AddHourlyEmployeeTransaction {
    return new AddHourlyEmployeeTransaction(
      employeeId,
      employeeName,
      employeeAddress,
      this.employeeRepository,
      this.payrollFactory,
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
  constructor(
    employeeRepository: ERepository,
    private payrollFactory: PayrollFactory,
  ) {
    super(employeeRepository);
  }
  createAddEmployeeTransaction(): AddCommissionEmployeeTransaction {
    return new AddCommissionEmployeeTransaction(
      employeeId,
      employeeName,
      employeeAddress,
      this.employeeRepository,
      this.payrollFactory,
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
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [],
    }).compile();
  });

  describe('AddSalaryEmployeeTransaction execute method', () => {
    it('When execute method is called a salaryEmployee is created', () => {
      const salaryEmployeeAdderTester = new SalaryEmployeeAdderTester(
        new EmployeeRepository(),
        new PayrollFactoryImplementation(),
      );
      salaryEmployeeAdderTester.test();
    });
  });

  describe('AddHourlyEmployeeTransaction execute method', () => {
    it('When execute method is called a hourlyEmployee is created', () => {
      const hourlyEmployeeAdderTester = new HourlyEmployeeAdderTester(
        new EmployeeRepository(),
        new PayrollFactoryImplementation(),
      );
      hourlyEmployeeAdderTester.test();
    });
  });

  describe('AddCommissionEmployeeTransaction execute method', () => {
    it('When execute method is called a commissionEmployee is created', () => {
      const commissionEmployeeAdderTester = new CommissionEmployeeAdderTester(
        new EmployeeRepository(),
        new PayrollFactoryImplementation(),
      );
      commissionEmployeeAdderTester.test();
    });
  });
});
