export const GET_ETH_TRANSATIONS = "GET_ETH_TRANSATIONS";
export const GET_QLDB_TRANSACTIONS = "GET_QLDB_TRANSACTIONS";


//Action Creator
export const getEthTransactions = (transactionsCount) => {
  return {
     type: GET_ETH_TRANSATIONS,
     transactions: transactionsCount
  };
};

export const getQldbTransactions = (transactions) => ({
    type: GET_QLDB_TRANSACTIONS,
    transactions
});
