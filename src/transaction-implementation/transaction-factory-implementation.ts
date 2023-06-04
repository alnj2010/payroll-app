import { TransactionFactory } from '../transaction-factory/transaction-factory';
import { AffiliationRepository } from '../payroll-repository/afiliation-repository';
import { ERepository } from '../payroll-repository/e-repository';
import { Transaction } from '../transaction/transaction';
import { AddCommissionEmployeeTransaction } from './add-commission-employee-transaction';
import { AddHourlyEmployeeTransaction } from './add-hourly-employee-transaction';
import { AddSalaryEmployeeTransaction } from './add-salary-employee-transaction';
import { AddSaleReceiptTransaction } from './add-sale-receipt-transaction';
import { AddServiceChargeTransaction } from './add-service-charge-transaction';
import { AddTimeCardTransaction } from './add-time-card-transaction';
import { ChangeEmployeeAddressTransaction } from './change-employee-address-transaction';
import { ChangeEmployeeNameTransaction } from './change-employee-name-transaction';
import { ChangeEmployeeToCommissionClassificationTransaction } from './change-employee-to-commission-classification-transaction';
import { ChangeEmployeeToDirectMethodTransaction } from './change-employee-to-direct-method-transaction';
import { ChangeEmployeeToHoldMethodTransaction } from './change-employee-to-hold-method-transaction';
import { ChangeEmployeeToHourlyClassificationTransaction } from './change-employee-to-hourly-classification-transaction';
import { ChangeEmployeeToMailMethodTransaction } from './change-employee-to-mail-method-transaction';
import { ChangeEmployeeToNoAffiliationTransaction } from './change-employee-to-no-affiliation-transaction';
import { ChangeEmployeeToSalaryClassificationTransaction } from './change-employee-to-salary-classification-transaction';
import { ChangeEmployeeToUnionAffiliationTransaction } from './change-employee-to-union-affiliate-transaction';
import { DeleteEmployeeTransaction } from './delete-employee-transaction';
import { PaydayTransaction } from './payday-transaction';
import { PayrollFactory } from '../payroll-factory/payroll-factory';

export class TransactionFactoryImplementation implements TransactionFactory {
  constructor(
    private employeeRepository: ERepository,
    private unionAffiliationsRepository: AffiliationRepository,
    private payrollFactoryImplementation: PayrollFactory,
  ) {}
  makeAddSalaryEmployeeTransaction(
    id: string,
    name: string,
    address: string,
    monthlySalary: number,
  ): Transaction {
    return new AddSalaryEmployeeTransaction(
      id,
      name,
      address,
      this.employeeRepository,
      this.payrollFactoryImplementation,
      monthlySalary,
    );
  }

  makeAddHourlyEmployeeTransaction(
    id: string,
    name: string,
    address: string,
    hourlyRate: number,
  ): Transaction {
    return new AddHourlyEmployeeTransaction(
      id,
      name,
      address,
      this.employeeRepository,
      this.payrollFactoryImplementation,
      hourlyRate,
    );
  }

  makeAddCommissionEmployeeTransaction(
    id: string,
    name: string,
    address: string,
    monthlySalary: number,
    commissionRate: number,
  ): Transaction {
    return new AddCommissionEmployeeTransaction(
      id,
      name,
      address,
      this.employeeRepository,
      this.payrollFactoryImplementation,
      monthlySalary,
      commissionRate,
    );
  }

  makeDeleteEmployeeTransaction(id: string): Transaction {
    return new DeleteEmployeeTransaction(id, this.employeeRepository);
  }

  makeAddTimeCardTransaction(
    id: string,
    date: string,
    hours: number,
  ): Transaction {
    return new AddTimeCardTransaction(
      id,
      date,
      hours,
      this.employeeRepository,
      this.payrollFactoryImplementation,
    );
  }

  makeAddSaleReceiptTransaction(
    id: string,
    date: string,
    amount: number,
  ): Transaction {
    return new AddSaleReceiptTransaction(
      id,
      date,
      amount,
      this.employeeRepository,
      this.payrollFactoryImplementation,
    );
  }

  makeAddServiceChargeTransaction(
    date: string,
    memberId: string,
    amount: number,
  ): Transaction {
    return new AddServiceChargeTransaction(
      date,
      memberId,
      amount,
      this.unionAffiliationsRepository,
      this.payrollFactoryImplementation,
    );
  }

  makePaydayTransaction(date: string): Transaction {
    return new PaydayTransaction(date, this.employeeRepository);
  }

  makeChangeEmployeeNameTransaction(id: string, name: string): Transaction {
    return new ChangeEmployeeNameTransaction(id, this.employeeRepository, name);
  }

  makeChangeEmployeeAddressTransaction(
    id: string,
    address: string,
  ): Transaction {
    return new ChangeEmployeeAddressTransaction(
      id,
      this.employeeRepository,
      address,
    );
  }

  makeChangeEmployeeToHourlyClassificationTransaction(
    id: string,
    hourlyRate: number,
  ): Transaction {
    return new ChangeEmployeeToHourlyClassificationTransaction(
      id,
      this.employeeRepository,
      this.payrollFactoryImplementation,
      hourlyRate,
    );
  }

  makeChangeEmployeeToSalaryClassificationTransaction(
    id: string,
    monthlySalary: number,
  ): Transaction {
    return new ChangeEmployeeToSalaryClassificationTransaction(
      id,
      this.employeeRepository,
      this.payrollFactoryImplementation,
      monthlySalary,
    );
  }

  makeChangeEmployeeToCommissionClassificationTransaction(
    id: string,
    monthlySalary: number,
    commissionRate: number,
  ): Transaction {
    return new ChangeEmployeeToCommissionClassificationTransaction(
      id,
      this.employeeRepository,
      this.payrollFactoryImplementation,
      monthlySalary,
      commissionRate,
    );
  }

  makeChangeEmployeeToHoldMethodTransaction(id: string): Transaction {
    return new ChangeEmployeeToHoldMethodTransaction(
      id,
      this.employeeRepository,
      this.payrollFactoryImplementation,
    );
  }

  makeChangeEmployeeToDirectMethodTransaction(
    id: string,
    bank: string,
    account: string,
  ): Transaction {
    return new ChangeEmployeeToDirectMethodTransaction(
      id,
      this.employeeRepository,
      this.payrollFactoryImplementation,
      bank,
      account,
    );
  }

  makeChangeEmployeeToMailMethodTransaction(
    id: string,
    mail: string,
  ): Transaction {
    return new ChangeEmployeeToMailMethodTransaction(
      id,
      this.employeeRepository,
      this.payrollFactoryImplementation,
      mail,
    );
  }

  makeChangeEmployeeToUnionAffiliationTransaction(
    id: string,
    memberId: string,
    rate: number,
  ): Transaction {
    return new ChangeEmployeeToUnionAffiliationTransaction(
      id,
      this.employeeRepository,
      this.unionAffiliationsRepository,
      this.payrollFactoryImplementation,
      memberId,
      rate,
    );
  }

  makeChangeEmployeeToNoAffiliationTransaction(id: string): Transaction {
    return new ChangeEmployeeToNoAffiliationTransaction(
      id,
      this.employeeRepository,
      this.unionAffiliationsRepository,
      this.payrollFactoryImplementation,
    );
  }
}
