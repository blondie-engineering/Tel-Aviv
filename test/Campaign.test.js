const assert = require('assert');

const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());


const compiledFactory = require('../ethereum/build/TransactionFactory.json');
const compiledTransaction = require('../ethereum/build/Transaction.json');

let accounts;
let factory;
let transactionAddress;
let transaction;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: '2000000' });

  await factory.methods.createTransaction('200', 'Test Company Name').send({
    from: accounts[0],
    gas: '2000000'
  });

  [transactionAddress] = await factory.methods.getDeployedTransactions().call();
  transaction = await new web3.eth.Contract(
    JSON.parse(compiledTransaction.interface),
    transactionAddress
  );
});

describe('Transactions', () => {
  it('deploys a factory and a transaction', () => {
    assert.ok(factory.options.address);
    assert.ok(transaction.options.address);
  });


});
