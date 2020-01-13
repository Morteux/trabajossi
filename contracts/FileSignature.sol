pragma solidity >=0.4.21 <0.7.0;
//pragma experimental ABIEncoderV2;

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
  //Funciones que necesitan una funcionalidad experimental (ABIEncoderV2),
  //así que hemos decidido no usarlas. Más información en la documentación del proyecto

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
    (address[] memory, string[] memory, string[] memory, string[] memory)
  {
    address[] memory owners;
    string[] memory dates;
    string[] memory IPFSHashes;
    string[] memory transactionHashes;

    for (uint i = 0; i < files.length; i++) {
      owners[i] = files[i].owner;
      dates[i] = files[i].date;
      IPFSHashes[i] = files[i].IPFSHash;
      transactionHashes[i] = files[i].transactionHash;
    }

    return(owners, dates, IPFSHashes, transactionHashes);
  }
*/
}
