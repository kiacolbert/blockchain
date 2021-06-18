const BlockChain = require("./blockChain");

const bitcoin = new BlockChain();
// const previousBlockHash = '78989dsfafdsaf';
// const nonce = 100;
// const currentBlockData = [
//     {
//         amount: 10,
//         sender: 'B4CEE9C0E5CD571',
//         recipient: '3A3F6E462D48E9',  
//     }  
// ]
// bitcoin.hashBlock(previousBlockHash, nonce, currentBlockData);

// bitcoin.createNewBlock(2389,'OIUOEREDHKHKD','78s97d4x6dsf');
// bitcoin.createNewTransaction(1000, 'you','me');
// bitcoin.createNewBlock(548764,'AKMC875E6S1RS9','WPLS214R7T6SJ3G2');

// bitcoin.createNewTransaction(2000, 'sam','jay');
// bitcoin.createNewTransaction(3000, 'fam','bay');
// bitcoin.createNewBlock(548764,'PPMC875E6S1RS9','MMLS214R7T6SJ3G2');
// console.log(bitcoin);
// console.log(bitcoin.proofOfWork(previousBlockHash, currentBlockData));
const bc1 = {"chain":[{"index":1,"timeStamp":1623931754634,"transactions":[],"nonce":100,"hash":"0","previousBlockHash":"0"},{"index":2,"timeStamp":1623931820767,"transactions":[],"nonce":18140,"hash":"0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100","previousBlockHash":"0"},{"index":3,"timeStamp":1623931822264,"transactions":[{"amount":12.5,"sender":"00","recipient":"fcaae6f0cf6411eb918e5be7e7f059f6","transactionId":"fcb56e40cf6411eb918e5be7e7f059f6"}],"nonce":12218,"hash":"0000ef7984b0d7f694706c3fbbde4d9aca2a3c08c4fc88b485362b3b6b8bc680","previousBlockHash":"0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100"},{"index":4,"timeStamp":1623931828579,"transactions":[{"amount":12.5,"sender":"00","recipient":"fd8f5380cf6411eb918e5be7e7f059f6","transactionId":"fd9064f0cf6411eb918e5be7e7f059f6"}],"nonce":133842,"hash":"0000d3d6e2f3cb7cc57b6432baf45aea0ac06f906bfbcf074fba6d0c970e0738","previousBlockHash":"0000ef7984b0d7f694706c3fbbde4d9aca2a3c08c4fc88b485362b3b6b8bc680"},{"index":5,"timeStamp":1623931917543,"transactions":[{"amount":12.5,"sender":"00","recipient":"0152eb30cf6511eb918e5be7e7f059f6","transactionId":"0153fca0cf6511eb918e5be7e7f059f6"},{"amount":1100,"sender":"betty","recipient":"susan","transactionId":"19566130cf6511eb918e5be7e7f059f6"},{"amount":80,"sender":"Liam","recipient":"Olof","transactionId":"24e05420cf6511eb918e5be7e7f059f6"}],"nonce":144328,"hash":"0000dfff29e0cec61584be3edd88c7342a277d2b674be313faa84b0b00ad0276","previousBlockHash":"0000d3d6e2f3cb7cc57b6432baf45aea0ac06f906bfbcf074fba6d0c970e0738"},{"index":6,"timeStamp":1623931979502,"transactions":[{"amount":12.5,"sender":"00","recipient":"36599860cf6511eb918e5be7e7f059f6","transactionId":"365c7e90cf6511eb918e5be7e7f059f6"},{"amount":80,"sender":"Liam","recipient":"Olof","transactionId":"50533910cf6511eb918e5be7e7f059f6"},{"amount":8800,"sender":"Liam9090","recipient":"567567Olof","transactionId":"5656aea0cf6511eb918e5be7e7f059f6"}],"nonce":51678,"hash":"0000ec4596d31205b35e003e2a35a753c5a5484a8929a0a49ef682e882125e62","previousBlockHash":"0000dfff29e0cec61584be3edd88c7342a277d2b674be313faa84b0b00ad0276"},{"index":7,"timeStamp":1623932009522,"transactions":[{"amount":12.5,"sender":"00","recipient":"5b47f0e0cf6511eb918e5be7e7f059f6","transactionId":"5b48db40cf6511eb918e5be7e7f059f6"}],"nonce":131847,"hash":"00003a323a6e8f69728f73c3cc83e54c73816a634cb70a9d2ff54978812e5e9c","previousBlockHash":"0000ec4596d31205b35e003e2a35a753c5a5484a8929a0a49ef682e882125e62"}],"pendingTransactions":[{"amount":12.5,"sender":"00","recipient":"6d2ca120cf6511eb918e5be7e7f059f6","transactionId":"6d2d3d60cf6511eb918e5be7e7f059f6"}],"currentNodeUrl":"http://localhost:3001","networkNodes":[]}
console.log('VALID:' , bitcoin.chainIsValid(bc1.chain));