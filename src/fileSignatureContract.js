import web3 from "./web3";

const address = "0x8C175d78F21BFA747f58287afc6D0d1081074958";

const abi = [
  {
    constant: false,
    inputs: [
      {
        internalType: "string",
        name: "date",
        type: "string"
      },
      {
        internalType: "string",
        name: "IPFSHash",
        type: "string"
      },
      {
        internalType: "string",
        name: "transactionHash",
        type: "string"
      }
    ],
    name: "upload",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "string",
        name: "fileHash",
        type: "string"
      }
    ],
    name: "download",
    outputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        internalType: "string",
        name: "date",
        type: "string"
      },
      {
        internalType: "string",
        name: "IPFSHash",
        type: "string"
      },
      {
        internalType: "string",
        name: "transactionHash",
        type: "string"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  }
];

export default new web3.eth.Contract(abi, address);
