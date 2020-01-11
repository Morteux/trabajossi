/*
import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();

    // Update state with the result.
    this.setState({ storageValue: response });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of 5 (by default).
        </p>
        <p>
          Try changing the value stored on <strong>line 40</strong> of App.js.
        </p>
        <div>The stored value is: {this.state.storageValue}</div>
      </div>
    );
  }
}

export default App;
*/

import React, { Component } from "react";
import "./App.css";
import web3 from "./web3";
import ipfs from "./ipfs";
import storeMyValue from "./storeMyValue";
class App extends Component {
  state = {
    ipfsHash: null,
    buffer: "",
    transactionHash: "",
    gasUsed: "",
    txReceipt: ""
  };
  captureFile = event => {
    event.stopPropagation();
    event.preventDefault();
    const file = event.target.files[0];
    let reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => this.convertToBuffer(reader);
  };
  convertToBuffer = async reader => {
    //file is converted to a buffer for upload to IPFS
    const buffer = await Buffer.from(reader.result);
    //set this buffer -using es6 syntax
    this.setState({ buffer });
  };
  onSubmit = async event => {
    event.preventDefault();
    console.log("web3 value is ", web3.eth.getAccounts());
    const accounts = await web3.eth.getAccounts();
    console.log("Sending from Metamask account: ", accounts[0]);
    const ethAddress = await storeMyValue.options.address;
    this.setState({ ethAddress });
    await ipfs.add(this.state.buffer, (err, ipfsHash) => {
      console.log(err, ipfsHash);
      this.setState({ ipfsHash: ipfsHash[0].hash });
      storeMyValue.methods.set(this.state.ipfsHash).send(
        {
          from: accounts[0]
        },
        (error, transactionHash) => {
          console.log("transaction hash is ", transactionHash);
          this.setState({ transactionHash });
        }
      );
    });
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1> IPFS Dapp</h1>
        </header>
        <hr />
        <h3> Choose file to send to IPFS </h3>
        <form onSubmit={this.onSubmit}>
          <input type="file" onChange={this.captureFile} />
          <button type="submit"> Send it </button>
        </form>
        <hr />
        <table>
          <thead>
            <tr>
              <th>Sl No</th>
              <th>Values</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>IPFS Hash # stored on Eth Contract</td>
              <td>{this.state.ipfsHash}</td>
            </tr>
            <tr>
              <td>Ethereum Contract Address</td>
              <td>{this.state.ethAddress}</td>
            </tr>
            <tr>
              <td>Tx Hash # </td>
              <td>{this.state.transactionHash}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
export default App;