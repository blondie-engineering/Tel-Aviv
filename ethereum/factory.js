import web3 from './web3';
import TransactionFactory from './build/TransactionFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(TransactionFactory.interface),
  '0x530101Fa647434064FF087614E7DC123f358807f'
);

export default instance;
