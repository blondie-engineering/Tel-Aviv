import web3 from './web3';
import TransactionFactory from './build/TransactionFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(TransactionFactory.interface),
  'xxx'
);

export default instance;
