import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  // We are in the browser and metamask is running.
  ethereum = window.ethereum;
  web3 = new Web3(window.web3.currentProvider);
  ethereum.enable();
} else {
  // We are on the server *OR* the user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/v3/0ea267996e4943adae855a4e240c8292'
  );
  web3 = new Web3(provider);
}

export default web3;
