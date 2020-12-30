const contextReducer = (state, action) => {
  let transactions;
  switch (action.type) {
    case "ADD_TRANSACTION":
      transactions = [...state, action.payload];
      localStorage.setItem("transactions", JSON.stringify(transactions));
      return transactions;

    case "DELETE_TRANSACTION":
      transactions = state.filter(
        (transaction) => transaction.id !== action.payload
      );
      return transactions;

    default:
      return state;
  }
};

export default contextReducer;
