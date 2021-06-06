const BlockChain = require("./blockChain");

const bitcoin = new BlockChain();
const previousBlockHash = '78989dsfafdsaf';
const nonce = 100;
const currentBlockData = [
    {
        amount: 10,
        sender: 'B4CEE9C0E5CD571',
        recipient: '3A3F6E462D48E9',  
    }  
]
// bitcoin.hashBlock(previousBlockHash, nonce, currentBlockData);

// bitcoin.createNewBlock(2389,'OIUOEREDHKHKD','78s97d4x6dsf');
// bitcoin.creatNewTransaction(1000, 'you','me');
// bitcoin.createNewBlock(548764,'AKMC875E6S1RS9','WPLS214R7T6SJ3G2');

// bitcoin.creatNewTransaction(2000, 'sam','jay');
// bitcoin.creatNewTransaction(3000, 'fam','bay');
// bitcoin.createNewBlock(548764,'PPMC875E6S1RS9','MMLS214R7T6SJ3G2');
console.log(bitcoin);
// console.log(bitcoin.proofOfWork(previousBlockHash, currentBlockData));
