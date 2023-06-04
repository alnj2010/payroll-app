import { Injectable } from '@nestjs/common';
import { TransactionSource } from '../text-parser-transaction-source/transaction-source';
import { Transaction } from '../transaction/transaction';

@Injectable()
export class PayrollApplicationService {
  constructor(private transactionSource: TransactionSource) {}
  init(): void {
    while (true) {
      const transaction: Transaction = this.transactionSource.getTransaction();
      transaction.execute();
    }
  }
}
