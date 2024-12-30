import { useState } from 'react';
import { DynamicForm } from './components/DynamicForm';
import { SankeyDiagram } from './components/SankeyDiagram';

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
}

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const handleTransactions = (newTransactions: Transaction[]) => {
    setTransactions(newTransactions);
  };

  return (
    <div className="app">
      <h1>Income/Expense Flow</h1>
      <DynamicForm onSubmit={handleTransactions} />
      {transactions.length > 0 && (
        <SankeyDiagram transactions={transactions} />
      )}
    </div>
  );
}

export default App;
