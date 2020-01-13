pragma solidity >=0.4.21 <0.7.0;

contract FileSignature {

  struct File{
    //Información de archivo
    address owner;    //Propietario
    string date;      //Fecha de subida
    string IPFSHash;        //Hash del archivo en IPFS
    string transactionHash; //Hash de la transacción que lo subió a IPFS
  }

  File[] files;

  // Devuelve la información del archivo que se va a descargar
  function upload(string memory date, string memory IPFSHash, string memory transactionHash) public
  {
    files.push(File(msg.sender, date, IPFSHash, transactionHash));
  }
/*
  // Devuelve la información del archivo que se va a descargar
  function download(string memory fileHash) public view returns
    (address owner, string memory date, string memory IPFSHash, string memory transactionHash)
  {
    File memory file = File(msg.sender, '', '', '');

    for (uint i = 0; i < files.length; i++) {
      if(keccak256(abi.encodePacked((files[i].IPFSHash))) == keccak256(abi.encodePacked((fileHash)))) file = files[i];
    }

    return(file.owner, file.date, file.IPFSHash, file.transactionHash);
  }

  // Devuelve la información del archivo que se va a descargar
  function getFiles() public view returns
    (address[] memory owner, string[] memory date, string[] memory IPFSHash, string[] memory transactionHash)
  {
    File memory file = File(msg.sender, '', '', '');

    for (uint i = 0; i < files.length; i++) {
      if(keccak256(abi.encodePacked((files[i].IPFSHash))) == keccak256(abi.encodePacked((fileHash)))) file = files[i];
    }

    return(file.owner, file.date, file.IPFSHash, file.transactionHash);
  }
  */
}