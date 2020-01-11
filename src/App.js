import React, { Component } from "react";
import "./App.css";
import web3 from "./web3";
import ipfs from "./ipfs";
import storeMyValue from "./storeMyValue";

class App extends Component {
  state = {
    nameExt: "",
    size: "",
    date: "",
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

    const nameExt = file.name;
    this.setState({ nameExt });
    const size = file.size / 1000;
    this.setState({ size });
    const date = String(new Date());
    this.setState({ date });

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

  ///////////////////////////////////////////////////////////////////
  /*
  sendHash = event => {
    event.stopPropagation();
    event.preventDefault();

    const IPFSHash = document.getElementById("hash");

    var file = ipfs.get(IPFSHash);

    //reader.readAsArrayBuffer(file);
    //reader.onloadend = () => this.convertToBuffer(reader);
  };
*/
  /*
  const fileHash = 'you hash of the file you want to get'

  ipfs.files.get(fileHash, function (err, files) {
      files.forEach((file) => {
          console.log(file.path)
          console.log("File content >> ",file.content.toString('utf8'))
      })
  })
*/

  ///////////////////////////////////////////////////////////////////

  render() {
    return (
      <div className="App">
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
          integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
          crossorigin="anonymous"
        ></link>
        <header className="App-header">
          <h1> Trabajo SSI - IPFS Dapp</h1>
        </header>
        <hr />
        <h3> Choose file to send to IPFS </h3>

        <form onSubmit={this.onSubmit}>
          <div class="input-group mb-3">
            <input
              class="form-control"
              type="file"
              onChange={this.captureFile}
            />
            <button type="submit" class="btn btn-info">
              {" "}
              Send it{" "}
            </button>
          </div>
        </form>
        <hr />
        <table>
          <thead>
            <tr>
              <th>File Properties</th>
              <th>Values</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Name and extension</td>
              <td>{this.state.nameExt}</td>
            </tr>
            <tr>
              <td>Size (KB)</td>
              <td>{this.state.size}</td>
            </tr>
            <tr>
              <td>Date</td>
              <td>{this.state.date}</td>
            </tr>
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
