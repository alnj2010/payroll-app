import * as readlineSync from 'readline-sync';
import { Injectable } from '@nestjs/common';

import { TransactionSource } from './transaction-source';
import { Transaction } from '../transaction/transaction';

import { TransactionFactory } from '../transaction-factory/transaction-factory';

@Injectable()
export class TextParserTransaction implements TransactionSource {
  constructor(private transactionFactory: TransactionFactory) {}
  getTransaction(): Transaction {
    console.log('escribe tu peticion: ');
    const requestRaw = readlineSync.question();
    const requestList = requestRaw.split(' ');
    const type = requestList.shift();
    switch (type) {
      case 'AddEmp': {
        const id = requestList.shift();
        const name = requestList.shift();
        const address = requestList.shift();
        const classification = requestList.shift();
        switch (classification) {
          case 'H': {
            const [hourlyRate] = requestList;
            return this.transactionFactory.makeAddHourlyEmployeeTransaction(
              id,
              name,
              address,

              Number(hourlyRate),
            );
          }
          case 'S': {
            const [monthlySalary] = requestList;
            return this.transactionFactory.makeAddSalaryEmployeeTransaction(
              id,
              name,
              address,
              Number(monthlySalary),
            );
          }
          case 'C': {
            const [monthlySalary, commissionRate] = requestList;
            return this.transactionFactory.makeAddCommissionEmployeeTransaction(
              id,
              name,
              address,
              Number(monthlySalary),
              Number(commissionRate),
            );
          }
        }
      }
      case 'DelEmp': {
        const id = requestList.shift();
        return this.transactionFactory.makeDeleteEmployeeTransaction(id);
      }
      case 'TimeCard': {
        const id = requestList.shift();
        const date = requestList.shift();
        const hours = Number(requestList.shift());

        return this.transactionFactory.makeAddTimeCardTransaction(
          id,
          date,
          hours,
        );
      }
      case 'SalesReceipt': {
        const id = requestList.shift();
        const date = requestList.shift();
        const amount = Number(requestList.shift());

        return this.transactionFactory.makeAddSaleReceiptTransaction(
          id,
          date,
          amount,
        );
      }
      case 'ServiceCharge': {
        const date = requestList.shift();
        const memberId = requestList.shift();
        const amount = Number(requestList.shift());
        return this.transactionFactory.makeAddServiceChargeTransaction(
          date,
          memberId,
          amount,
        );
      }
      case 'ChgEmp': {
        const id = requestList.shift();
        const change = requestList.shift();
        switch (change) {
          case 'Name': {
            const name = requestList.shift();
            return this.transactionFactory.makeChangeEmployeeNameTransaction(
              id,
              name,
            );
          }
          case 'Address': {
            const address = requestList.shift();
            return this.transactionFactory.makeChangeEmployeeAddressTransaction(
              id,
              address,
            );
          }
          case 'Hourly': {
            const hourlyRate = Number(requestList.shift());
            return this.transactionFactory.makeChangeEmployeeToHourlyClassificationTransaction(
              id,
              hourlyRate,
            );
          }
          case 'Salaried': {
            const salary = Number(requestList.shift());
            return this.transactionFactory.makeChangeEmployeeToSalaryClassificationTransaction(
              id,
              salary,
            );
          }
          case 'Commissioned': {
            const salary = Number(requestList.shift());
            const commissioned = Number(requestList.shift());
            return this.transactionFactory.makeChangeEmployeeToCommissionClassificationTransaction(
              id,
              salary,
              commissioned,
            );
          }
          case 'Hold': {
            return this.transactionFactory.makeChangeEmployeeToHoldMethodTransaction(
              id,
            );
          }
          case 'Direct': {
            const bank = requestList.shift();
            const account = requestList.shift();
            return this.transactionFactory.makeChangeEmployeeToDirectMethodTransaction(
              id,
              bank,
              account,
            );
          }
          case 'Mail': {
            const mail = requestList.shift();
            return this.transactionFactory.makeChangeEmployeeToMailMethodTransaction(
              id,
              mail,
            );
          }
          case 'Member': {
            const memberId = requestList.shift();
            const rate = Number(requestList.pop());
            return this.transactionFactory.makeChangeEmployeeToUnionAffiliationTransaction(
              id,
              memberId,
              rate,
            );
          }
          case 'NoMember': {
            return this.transactionFactory.makeChangeEmployeeToNoAffiliationTransaction(
              id,
            );
          }
        }
      }
      case 'Payday': {
        const date = requestList.shift();
        return this.transactionFactory.makePaydayTransaction(date);
      }
    }
  }
}
