import web3 from './web3';
import TransactionFactory from './build/TransactionFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(TransactionFactory.interface),
  '0xDC5DE0422d785Ef17C03d7E9CB3D265a465B3a80'
);

export default instance;
