const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const Blockchain = require('./blockchain');
const rp = require('./promiseHttp');

const app = express();
const bitcoin = new Blockchain();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.argv[2];
const currentNodeUrl = process.argv[3];

app.get('/', (req, res) => {
  res.send('hello world')
});

// register a node and broadcast it the network
app.post('/register-and-broadcast-node', function(req, res) {
  bitcoin.currentNodeUrl = `http://${req.headers.host}`;
	const newNodeUrl = req.body.newNodeUrl;
  const urlParsed = new URL(newNodeUrl);
	if (bitcoin.networkNodes.indexOf(newNodeUrl) == -1) bitcoin.networkNodes.push(newNodeUrl);

	const regNodesPromises = [];
	bitcoin.networkNodes.forEach(networkNodeUrl => {
		const requestOptions = {
      hostname: urlParsed.hostname,
      port: urlParsed.port,
      // protocal: urlParsed.protocol,
			path:  '/register-node',
			method: 'POST'
		};
		regNodesPromises.push(rp(requestOptions, newNodeUrl));
	});

	Promise.all(regNodesPromises)
	.then(data => {
		const bulkRegisterOptions = {
      hostname: urlParsed.hostname,
      port: urlParsed.port,
      // protocal: urlParsed.protocol,
			path: '/register-node-bulk',
			method: 'POST'
		};
    let postData = JSON.stringify({ allNetworkNodes: [ ...bitcoin.networkNodes, bitcoin.currentNodeUrl ] });

		return rp(bulkRegisterOptions, postData, 'application/json');
	})
	.then(data => {
		res.json({ note: 'New node registered with network successfully.' });
	});
});


app.post('/register-node', (req, res) => {
  const newNodeUrl = req.body.newNodeUrl;
  const notCurrentNode = bitcoin.currentNodeUrl != newNodeUrl;
  const nodeNotAlreadyPresent =
    bitcoin.networkNodes.indexOf(newNodeUrl) == -1;
  if (nodeNotAlreadyPresent && notCurrentNode) {

    bitcoin.networkNodes.push(newNodeUrl);
  }
  res.json({ note: 'New node registered successfully.' });

});

app.post('/register-node-bulk', (req, res) => {
  const allNetworkNodes = req.body.allNetworkNodes;

  allNetworkNodes.forEach(networkNodeUrl => {
    const nodeNotAlreadyPresent = 
      bitcoin.networkNodes.indexOf(networkNodeUrl) == -1; 
      const notCurrentNode = bitcoin.currentNodeUrl !== networkNodeUrl
        if(nodeNotAlreadyPresent && notCurrentNode)
         bitcoin.networkNodes.push(networkNodeUrl);
 });
res.json({note: 'Bulk registration successful.' });
});

app.get('/blockchain', (req, res) => {
  res.send(bitcoin)
});

app.post('/transaction', (req, res) => {
  const blockIndex = bitcoin.createNewTransaction(req.body.amount,
    req.body.sender, req.body.recipient)
  res.json({ note: `Transaction will be added in block ${blockIndex}.` });
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

app.listen(port, () => console.log(`listening on port ${port}. . . `));