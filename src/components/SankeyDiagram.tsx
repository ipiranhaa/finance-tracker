import { Chart } from "react-google-charts";

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
}

interface SankeyProps {
  transactions: Transaction[];
}

export const SankeyDiagram: React.FC<SankeyProps> = ({ transactions }) => {
  const prepareData = () => {
    // Convert transactions to Google Charts Sankey data format
    const data: (string | number)[][] = [
      ["From", "To", "Amount"] // Header row
    ];

    transactions.forEach((trans) => {
      if (trans.type === 'income') {
        data.push([trans.category, "Total Income", trans.amount]);
      } else {
        data.push(["Total Income", trans.category, trans.amount]);
      }
    });

    return data;
  };

  return (
    <Chart
      chartType="Sankey"
      width="100%"
      height="400px"
      data={prepareData()}
      options={{
        sankey: {
          node: {
            colors: ['#a61d4c', '#595959', '#6f9654'],
            label: {
              fontName: 'Arial',
              fontSize: 14,
              color: '#871b47',
              bold: true,
            },
          },
          link: {
            colorMode: 'gradient',
            colors: ['#a61d4c', '#595959', '#6f9654'],
          },
        },
      }}
    />
  );
};
