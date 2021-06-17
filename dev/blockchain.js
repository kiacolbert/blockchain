const sha256 = require('sha256');
const uuid = require('uuid');
const currentNodeUrl = process.argv[3];

function BlockChain() {
  this.chain = [];
  this.pendingTransactions = [];
  this.currentNodeUrl = currentNodeUrl;
  this.networkNodes = [];
  this.createNewBlock(100, '0', '0')
}

BlockChain.prototype.createNewBlock = function (nonce, previousBlockHash, hash) {
  const newBlock = {
    index: this.chain.length + 1,
    timeStamp: Date.now(),
    transactions: this.pendingTransactions,
    nonce: nonce,
    hash: hash,
    previousBlockHash: previousBlockHash,
  }

  this.pendingTransactions = [];
  this.chain.push(newBlock);
  return newBlock;
}

BlockChain.prototype.addTransactionToPendingTransactions = function (transaction) {
  this.pendingTransactions.push(transaction);
  return this.getLastBlock()['index'] + 1;
}

BlockChain.prototype.getLastBlock = function () {
  return this.chain[this.chain.length - 1];
}

BlockChain.prototype.createNewTransaction = function (amount, sender, recipient) {
  const newTransaction = {
    amount,
    sender,
    recipient,
    transactionId: uuid.v1().split('-').join('')
  }
 return newTransaction;
}

BlockChain.prototype.hashBlock = function (previousBlockHash, currentBlockData, nonce) {
  const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
  const hash = sha256(dataAsString);
  return hash;
}

BlockChain.prototype.proofOfWork = function (previousBlockHash, currentBlockData) {
  let nonce = 0;
  let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);

  while(hash.substring(0,4) !== '0000') {
    nonce++;
    hash = this.hashBlock(previousBlockHash,currentBlockData, nonce);
  }
  return nonce;
}

module.exports = BlockChain;