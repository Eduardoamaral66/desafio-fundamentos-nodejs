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
    const incomes = this.transactions.filter((transaction) => {
      return transaction.type === 'income';
    });
    const totalIncome = incomes.reduce((sum, transaction) => {
      return sum + transaction.value;
    }, 0);

    const outcomes = this.transactions.filter((transaction) => {
      return transaction.type === 'outcome';
    });
    const totalOutcome = outcomes.reduce((sum, transaction) => {
      return sum + transaction.value;
    }, 0);

    const total = totalIncome - totalOutcome;

    return {
      income: totalIncome,
      outcome: totalOutcome,
      total
    }
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({
      title,
      type,
      value
    });
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
