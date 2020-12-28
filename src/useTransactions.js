import { useContext } from "react";
import {
  expenseCategories,
  incomeCategories,
  resetCategories,
} from "./constants/categorie";
import { ExpenseContext } from "./context/context";

const useTransactions = (title) => {
  resetCategories();
  const { transactions } = useContext(ExpenseContext);

  const selectedTransactionsPerType = transactions.filter(
    (t) => t.type === title
  );

  const total = selectedTransactionsPerType.reduce(
    (acc, current) => (acc += current.amount),
    0
  );
  let categories = title === "Income" ? incomeCategories : expenseCategories;

  selectedTransactionsPerType.forEach((t) => {
    let categorie = categories.find((cat) => cat.type === t.category);

    if (categorie) {
      categorie.amount += t.amount;
    }
  });

  const filteredCategories = categories.filter((cat) => cat.amount > 0);

  const chartData = {
    datasets: [
      {
        data: filteredCategories.map((c) => c.amount),
        backgroundColor: filteredCategories.map((c) => c.color),
      },
    ],
    labels: filteredCategories.map((c) => c.type),
  };

  return { filteredCategories, total, chartData };
};

export default useTransactions;
