import { Transaction } from '../transaction/transaction';

export interface TransactionFactory {
  makeAddSalaryEmployeeTransaction(
    id: string,
    name: string,
    address: string,
    monthlySalary: number,
  ): Transaction;

  makeAddHourlyEmployeeTransaction(
    id: string,
    name: string,
    address: string,
    hourlyRate: number,
  ): Transaction;

  makeAddCommissionEmployeeTransaction(
    id: string,
    name: string,
    address: string,
    monthlySalary: number,
    commissionRate: number,
  ): Transaction;

  makeDeleteEmployeeTransaction(id: string): Transaction;

  makeAddTimeCardTransaction(
    id: string,
    date: string,
    hours: number,
  ): Transaction;

  makeAddSaleReceiptTransaction(
    id: string,
    date: string,
    amount: number,
  ): Transaction;

  makeAddServiceChargeTransaction(
    date: string,
    memberId: string,
    amount: number,
  ): Transaction;

  makePaydayTransaction(date: string): Transaction;

  makeChangeEmployeeNameTransaction(id: string, name: string): Transaction;

  makeChangeEmployeeAddressTransaction(
    id: string,
    address: string,
  ): Transaction;

  makeChangeEmployeeToHourlyClassificationTransaction(
    id: string,
    hourlyRate: number,
  ): Transaction;

  makeChangeEmployeeToSalaryClassificationTransaction(
    id: string,
    monthlySalary: number,
  ): Transaction;

  makeChangeEmployeeToCommissionClassificationTransaction(
    id: string,
    monthlySalary: number,
    commissionRate: number,
  ): Transaction;

  makeChangeEmployeeToHoldMethodTransaction(id: string): Transaction;

  makeChangeEmployeeToDirectMethodTransaction(
    id: string,
    bank: string,
    account: string,
  ): Transaction;

  makeChangeEmployeeToMailMethodTransaction(
    id: string,
    mail: string,
  ): Transaction;

  makeChangeEmployeeToUnionAffiliationTransaction(
    id: string,
    memberId: string,
    rate: number,
  ): Transaction;

  makeChangeEmployeeToNoAffiliationTransaction(id: string): Transaction;
}
