import web3 from './web3';
import Transaction from './build/Transaction.json';

export default address => {
  return new web3.eth.Contract(JSON.parse(Transaction.interface), address);
};
