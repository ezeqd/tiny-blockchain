import sha256 from 'sha256';

class Block {
    constructor(index, timestamp, data, previousHash) {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.thisHash = sha256(
            this.index + this.timestamp + this.data + this.previousHash
        );
    }
}

const createGenesisBlock = () => new Block (0, Date.now(), 'GenesisBlock', '0');

const nextBlock = (lastBlock, data) =>
    new Block(lastBlock.index+1, Date.now(), data, lastBlock.thisHash);

const createBlockchain = num => {
    const blockchain = [createGenesisBlock()];
    let previousBlock = blockchain[0];

    for (let i = 1; i < num; i+=1) {
        const blockToAdd = nextBlock(previousBlock, 'This is the block #${i}');
        blockchain.push(blockToAdd);
        previousBlock = blockToAdd;
    }
    console.log(blockchain);
};

const cantBlocks = 10;
createBlockchain(cantBlocks);