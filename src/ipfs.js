//Local IPFS Daemon
const IPFS = require('ipfs');
const ipfs = new IPFS(/*{host: 'localhost', port: 5001, protocol: 'http' }*/);

export default ipfs;