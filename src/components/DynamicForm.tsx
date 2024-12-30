import React, { useState } from 'react';

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
}

interface DynamicFormProps {
  onSubmit: (transactions: Transaction[]) => void;
}

export const DynamicForm: React.FC<DynamicFormProps> = ({ onSubmit }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([{
    id: Date.now().toString(),
    type: 'income',
    category: '',
    amount: 0
  }]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(transactions);
  };

  const addField = () => {
    setTransactions([...transactions, {
      id: Date.now().toString(),
      type: 'income',
      category: '',
      amount: 0
    }]);
  };

  const removeField = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const updateTransaction = (id: string, field: keyof Transaction, value: string | number) => {
    setTransactions(transactions.map(t => 
      t.id === id ? { ...t, [field]: value } : t
    ));
  };

  return (
    <form onSubmit={handleSubmit}>
      {transactions.map((transaction) => (
        <div key={transaction.id} className="transaction-field">
          <select
            value={transaction.type}
            onChange={(e) => updateTransaction(transaction.id, 'type', e.target.value as 'income' | 'expense')}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <input
            type="text"
            placeholder="Category"
            value={transaction.category}
            onChange={(e) => updateTransaction(transaction.id, 'category', e.target.value)}
          />

          <input
            type="number"
            placeholder="Amount"
            value={transaction.amount}
            onChange={(e) => updateTransaction(transaction.id, 'amount', parseFloat(e.target.value))}
          />

          <button 
            type="button" 
            onClick={() => removeField(transaction.id)}
          >
            Remove
          </button>
        </div>
      ))}
      
      <button type="button" onClick={addField}>
        Add Transaction
      </button>
      
      <button type="submit">
        Generate Diagram
      </button>
    </form>
  );
};
