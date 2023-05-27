import { Transaction } from '../domain/transaction';

export interface TransactionSource {
  getTransaction(): Transaction;
}
