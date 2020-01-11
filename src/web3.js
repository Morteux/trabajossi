import Web3 from 'web3';

const web3 = new Web3(window.web3.currentProvider);

//Alternativa -> This is only for version 1.x of web3
//const web3 = new Web3(Web3.givenProvider || "ws://localhost:8546");
//console.log(web3.currentProvider.isMetaMask)

export default web3;