pragma solidity ^0.4.17;

contract TransactionFactory {
    address[] public deployedTransactions;
    address public newContract;

    function createTransaction(uint minimum, string companyName) public view returns (address) {
        address newTransaction = new Transaction(minimum, msg.sender, companyName);
        deployedTransactions.push(newTransaction);
        newContract = newTransaction;
    }

    function getNewContract() public view returns (address) {
        return newContract;
    }

    function getDeployedTransactions() public view returns (address[]) {
        return deployedTransactions;
    }
}

contract Transaction {

    address public manager;
    uint public amountValue;
    string public company;


    function Transaction(uint amount, address creator, string companyName) public {
        manager = creator;
        amountValue = amount;
        company = companyName;
    }

    function addAmount(uint newAmount) public {
      amountValue = amountValue + newAmount;
  }

    function getSummary() public view returns (
      uint, address, string
      ) {
        return (
          amountValue,
          manager,
          company
        );
    }
}
