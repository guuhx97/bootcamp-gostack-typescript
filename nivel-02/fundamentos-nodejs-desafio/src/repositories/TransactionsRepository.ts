import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const count = this.transactions.reduce(
      (accumulator, transaction) => {
        if(transaction.type == 'income'){
          accumulator.income += transaction.value
        }
        if(transaction.type === 'outcome') {
          accumulator.outcome += transaction.value
        }
        return accumulator;
      },{
        income: 0,
        outcome: 0,
        total: 0
      }
    );

    const total = count.income - count.outcome;
    const balance: Balance = {
      income: count.income,
      outcome: count.outcome,
      total: total
    }
    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
