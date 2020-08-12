import * as axios from 'axios';

const url = process.env.NEXT_PUBLIC_SERVER || 'http://localhost:3000';

export const createTransaction = async (amount, company) => {
  await axios.post(url + "/qldb/insertTransaction",  {
                                amount,
                                company
                              })
                              .then(response => response.data);
}

export const getTransactions = async () => {
  const transactions = axios.get(url + "/qldb/getAllTransactions")
                              .then(response => response.data)
  return transactions;
}

export const queryHistory = async (id) => {
  const history  = await axios.get(url + `/qldb/history?id=${id}`)
                              .then(response => response.data);
  return history;
}

export const backupInEth = async (id, ethAddress) => {
  await axios.get(url + `/qldb/updateTransactionStatus?id=${id}&ethAddress=${ethAddress}`)
                              .then(response => response.data)
}

export const addAmount = async (id) => {
  await axios.get(url + `/qldb/updateAmount?id=${id}&amount=100`)
                              .then(response => response.data)
}

export const deleteTransactions = async () => {
  await axios.delete(url + `/qldb/deleteAllData`)
                              .then(response => response.data)
}

export const verifyTransaction = async (id) => {
  return await axios.get(url + `/qldb/verifyTransaction?id=${id}`)
                              .then(response => response.data)
}
