import web3 from "./web3";

const address = "0x005e510bA4333c89B8590F14A2D46B489A093982";

const abi = [
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "string",
        "name": "date",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "IPFSHash",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "transactionHash",
        "type": "string"
      }
    ],
    "name": "upload",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

export default new web3.eth.Contract(abi, address);
