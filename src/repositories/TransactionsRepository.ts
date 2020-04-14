import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionTDO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  private balance: Balance;

  constructor() {
    this.transactions = [];
    this.balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };
  }

  // Retorna todos as transações e o balanço
  public all(): Transaction[] {
    return this.transactions;
  }

  // Faz o balanço total dos income e outcome
  public getBalance(): Balance {
    this.balance.total = this.balance.income - this.balance.outcome;

    return this.balance;
  }

  // Cria uma nova transação
  public create({ title, value, type }: CreateTransactionTDO): Transaction {
    const transaction = new Transaction({ title, value, type });

    if (type === 'income') {
      this.balance.income += value;
    }
    if (type === 'outcome') {
      if (this.balance.total >= value) {
        this.balance.outcome += value;
      } else {
        throw Error('Valor Estrapolado');
      }
    }

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
