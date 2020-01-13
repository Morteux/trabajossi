import React, { Component } from "react";
import "./App.css";
import web3 from "./web3";
import ipfs from "./ipfs";
import fileSignatureContract from "./fileSignatureContract";

class App extends Component {
  state = {
    nameExt: "",
    size: "",
    date: "",
    ipfsHash: null,
    ipfsLink: "https://ipfs.io/ipfs/",
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

    await web3.eth.enable;

    console.log("web3 value is ", window.web3.eth.getAccounts());

    const accounts = await web3.eth.getAccounts();
    //const accounts = ["0xc1663a36Ef30caDABD83aa66FBdD3b68E75cF590"];

    console.log("Sending from Metamask account: ", accounts[0]);
    const ethAddress = await fileSignatureContract.options.address;
    this.setState({ ethAddress });
    await ipfs.add(this.state.buffer, (err, ipfsHash) => {
      console.log(err, ipfsHash);
      this.setState({ ipfsHash: ipfsHash[0].hash });
      const ipfsLink = this.state.ipfsLink.concat(ipfsHash[0].hash);
      this.setState({ ipfsLink });
      fileSignatureContract.methods
        .upload(
          String(new Date()),
          this.state.ipfsHash,
          this.state.transactionHash
        )
        .send(
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
      <div className="">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        
        </link>
        <header className="App-header">
          <h1> <center>Trabajo SSI <br></br> Ethereum IPFS Dapp</center> </h1>
        </header>
        <hr />
        <div class="container my-2 text-center">
          
        <h3> Choose file to send to IPFS </h3>
        <br></br>
        <div class="col-md-8 col-sm-12 mt-1">
        <form onSubmit={this.onSubmit}>
        <div class="input-group mb-3">
          <input class="form-control " type="file" onChange={this.captureFile} />
          <button type="submit"class="btn btn-info"> Upload </button>
        </div>
        </form>
        </div>
        <hr />
        <table class="table  table-info table-bordered table-hover">
          <thead class=" bg-info">
            <tr>
              <th scope="col"><font color="white">File Properties</font></th>
              <th scope="col"><font color="white">Values</font></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><b>Name and Extension</b></td>
              <td>{this.state.nameExt}</td>
            </tr>
            <tr>
              <td><b>Size (KB)</b></td>
              <td>{this.state.size}</td>
            </tr>
            <tr>
              <td><b>Date and Time</b></td>
              <td>{this.state.date}</td>
            </tr>
            <tr>
              <td><b>IPFS File Hash</b></td>
              <td><a href={this.state.ipfsLink}>{this.state.ipfsHash}</a></td>
            </tr>
            <tr>
              <td><b>Ethereum Contract Address</b></td>
              <td>{this.state.ethAddress}</td>
            </tr>
            <tr>
              <td><b>Transaction Hash</b></td>
              <td>{this.state.transactionHash}</td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>
    );
  }
}

export default App;
