import * as axios from 'axios';

export const createTransaction = async (amount, company) => {
  await axios.post("http://localhost:3000/qldb/insertTransaction",  {
                                amount,
                                company
                              })
                              .then(response => response.data);
}

export const getTransactions = async () => {
  const transactions = axios.get("http://localhost:3000/qldb/getAllTransactions")
                              .then(response => response.data)
  return transactions;
}

export const queryHistory = async (id) => {
  const history  = await axios.get(`http://localhost:3000/qldb/history?id=${id}`)
                              .then(response => response.data);
  return history;
}

export const backupInEth = async (id, ethAddress) => {
  await axios.get(`http://localhost:3000/qldb/updateTransactionStatus?id=${id}&ethAddress=${ethAddress}`)
                              .then(response => response.data)
}

export const addAmount = async (id) => {
  await axios.get(`http://localhost:3000/qldb/updateAmount?id=${id}&amount=100`)
                              .then(response => response.data)
}

export const deleteTransactions = async () => {
  await axios.delete(`http://localhost:3000/qldb/deleteAllData`)
                              .then(response => response.data)
}
