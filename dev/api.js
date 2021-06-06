const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const Blockchain = require('./blockchain');

const app = express();
const bitcoin = new Blockchain();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('hello world')
});

app.get('/blockchain', (req, res) =>{
  res.send(bitcoin)
});

app.post('/transaction', (req, res) => {
  const blockIndex = bitcoin.createNewTransaction(req.body.amount,
    req.body.sender, req.body.recipient) 
    res.json({ note:`Transaction will be added in block ${blockIndex}.`});
});

app.get('/mine', (req, res) => {
  const lastBlock = bitcoin.getLastBlock();
  const previousBlockHash = lastBlock['hash'];
  const currentBlockData = {
    transactions: bitcoin.pendingTransactions,
    index: lastBlock['index'] + 1
  };
  const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData);
  const blockHash = bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce);
  const nodeAddress = uuid.v1().split('-').join('');
  bitcoin.createNewTransaction(12.5, 'the block', nodeAddress);
  const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, blockHash);



  res.json({
    note: 'new block created successfully',
    block: newBlock
  })
});

app.listen(3000, () => console.log('listening on port 3000. . . '));