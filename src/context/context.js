import React, { useReducer, createContext } from "react";
import contextReducer from "./contextReducer";

const initialState = JSON.parse(localStorage.getItem("transactions")) || [];

export const ExpenseContext = createContext(initialState);

export const Provider = ({ children }) => {
  const [transactions, dispatch] = useReducer(contextReducer, initialState);

  //Action creators
  const deleteTransaction = (id) => {
    dispatch({ type: "DELETE_TRANSACTION", payload: id });
  };

  const addTransaction = (transaction) => {
    dispatch({ type: "ADD_TRANSACTION", payload: transaction });
  };

  const totalBalance = transactions.reduce((acc, curr) => {
    return curr.type === "Expense"
      ? (acc -= curr.amount)
      : (acc += curr.amount);
  }, 0);

  console.log("transactions", transactions);
  return (
    <ExpenseContext.Provider
      value={{ deleteTransaction, addTransaction, transactions, totalBalance }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
