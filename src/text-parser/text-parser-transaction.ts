import { AddSalaryEmployeeTransaction } from '../classification/add-salary-employee-transaction';
import { TransactionSource } from '../payroll-application/transaction-source';
import { Transaction } from '../domain/transaction';
import * as readlineSync from 'readline-sync';
import { AddHourlyEmployeeTransaction } from '../classification/add-hourly-employee-transaction';
import { AddCommissionEmployeeTransaction } from '../classification/add-commission-employee-transaction';
import { DeleteEmployeeTransaction } from '../delete-transaction/delete-employee-transaction';
import { AddTimeCardTransaction } from '../classification/add-time-card-transaction';
import { AddSaleReceiptTransaction } from '../classification/add-sale-receipt-transaction';
import { AddServiceChargeTransaction } from '../affiliation/add-service-charge-transaction';
import { PaydayTransaction } from '../payday/payday-transaction';
import { ChangeEmployeeNameTransaction } from '../change-employee-name/change-employee-name-transaction';
import { ChangeEmployeeAddressTransaction } from '../change-employee-address/change-employee-address-transaction';
import { ChangeEmployeeToHourlyClassificationTransaction } from '../classification/change-employee-to-hourly-classification-transaction';
import { ChangeEmployeeToSalaryClassificationTransaction } from '../classification/change-employee-to-salary-classification-transaction';
import { ChangeEmployeeToCommissionClassificationTransaction } from '../classification/change-employee-to-commission-classification-transaction';
import { ChangeEmployeeToHoldMethodTransaction } from '../method/change-employee-to-hold-method-transaction';
import { ChangeEmployeeToDirectMethodTransaction } from '../method/change-employee-to-direct-method-transaction';
import { ChangeEmployeeToMailMethodTransaction } from '../method/change-employee-to-mail-method-transaction';
import { ChangeEmployeeToUnionAffiliationTransaction } from '../affiliation/change-employee-to-union-affiliate-transaction';
import { ChangeEmployeeToNoAffiliationTransaction } from '../affiliation/change-employee-to-no-affiliation-transaction';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TextParserTransaction implements TransactionSource {
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
            return new AddHourlyEmployeeTransaction(
              id,
              name,
              address,
              Number(hourlyRate),
            );
          }
          case 'S': {
            const [monthlySalary] = requestList;
            return new AddSalaryEmployeeTransaction(
              id,
              name,
              address,
              Number(monthlySalary),
            );
          }
          case 'C': {
            const [monthlySalary, commissionSalary] = requestList;
            return new AddCommissionEmployeeTransaction(
              id,
              name,
              address,
              Number(monthlySalary),
              Number(commissionSalary),
            );
          }
        }
      }
      case 'DelEmp': {
        const id = requestList.shift();
        return new DeleteEmployeeTransaction(id);
      }
      case 'TimeCard': {
        const id = requestList.shift();
        const date = requestList.shift();
        const hours = Number(requestList.shift());

        return new AddTimeCardTransaction(id, date, hours);
      }
      case 'SalesReceipt': {
        const id = requestList.shift();
        const date = requestList.shift();
        const amount = Number(requestList.shift());

        return new AddSaleReceiptTransaction(id, date, amount);
      }
      case 'ServiceCharge': {
        const date = requestList.shift();
        const memberId = requestList.shift();
        const amount = Number(requestList.shift());
        return new AddServiceChargeTransaction(date, memberId, amount);
      }
      case 'ChgEmp': {
        const id = requestList.shift();
        const change = requestList.shift();
        switch (change) {
          case 'Name': {
            const name = requestList.shift();
            return new ChangeEmployeeNameTransaction(id, name);
          }
          case 'Address': {
            const address = requestList.shift();
            return new ChangeEmployeeAddressTransaction(id, address);
          }
          case 'Hourly': {
            const hourlyRate = Number(requestList.shift());
            return new ChangeEmployeeToHourlyClassificationTransaction(
              id,
              hourlyRate,
            );
          }
          case 'Salaried': {
            const salary = Number(requestList.shift());
            return new ChangeEmployeeToSalaryClassificationTransaction(
              id,
              salary,
            );
          }
          case 'Commissioned': {
            const salary = Number(requestList.shift());
            const commissioned = Number(requestList.shift());
            return new ChangeEmployeeToCommissionClassificationTransaction(
              id,
              salary,
              commissioned,
            );
          }
          case 'Hold': {
            return new ChangeEmployeeToHoldMethodTransaction(id);
          }
          case 'Direct': {
            const bank = requestList.shift();
            const account = requestList.shift();
            return new ChangeEmployeeToDirectMethodTransaction(
              id,
              bank,
              account,
            );
          }
          case 'Mail': {
            const mail = requestList.shift();
            return new ChangeEmployeeToMailMethodTransaction(id, mail);
          }
          case 'Member': {
            const memberId = requestList.shift();
            const rate = Number(requestList.pop());
            return new ChangeEmployeeToUnionAffiliationTransaction(
              id,
              memberId,
              rate,
            );
          }
          case 'NoMember': {
            return new ChangeEmployeeToNoAffiliationTransaction(id);
          }
        }
      }
      case 'Payday': {
        const date = requestList.shift();
        return new PaydayTransaction(date);
      }
    }
  }
}
