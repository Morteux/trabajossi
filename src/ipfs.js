//Local IPFS Daemon
const ipfsApi = require('ipfs');
const ipfs = new ipfsApi(/*{host: 'localhost', port: 5001, protocol: 'http' }*/);

//IPFS Infura
//const IPFS = require('ipfs');
//const ipfs = new IPFS({host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

export default ipfs;