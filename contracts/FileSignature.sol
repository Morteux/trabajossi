pragma solidity >=0.4.21 <0.7.0;
//pragma experimental ABIEncoderV2;   //Esperimental es necesario para "File memory" (?)

/*
ARRAYS
length
push() devuelve el elemento del final
push(x) inserta x al final
pop() elimina el elemento del final
*/
/*
memory -> indica variable temporal
storage -> indica variable persistente
*/
/*
Comparar dos strings a y b
keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b)))
*/

contract FileSignature {

  struct File{
    //Información de archivo
    address owner;    //Propietario
    string date;      //Fecha de subida
    string IPFSHash;        //Hash del archivo en IPFS
    string transactionHash; //Hash de la transacción que lo subió a IPFS
  }

  //string[] hashes;
  File[] files;
/*
  function set(string memory newHash) public
  {
    File memory newFile = File('', '', 0, 0, msg.sender, 0, newHash, '');

    files.push(newFile);
  }

  function get(string memory oldHash) public view returns (string memory name, string memory ext, uint size, uint downloads,
                                          address owner,  uint date, string memory IPFSHash, string memory transactionHash)
  {
    File memory file = File('', '', 0, 0, msg.sender, 0, '', '');

    for (uint i = 0; i < files.length; i++) {
      if(keccak256(abi.encodePacked((files[i].IPFSHash))) == keccak256(abi.encodePacked((oldHash)))) file = files[i];
    }

    return(file.name, file.ext, file.size, file.downloads, file.owner, file.date, file.IPFSHash, file.transactionHash);
  }
*/
  // Devuelve la información del archivo que se va a descargar
  function upload(string memory date, string memory IPFSHash, string memory transactionHash) public
  {
    files.push(File(msg.sender, date, IPFSHash, transactionHash));
  }

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
}

/*
contract SimpleStorage {
  string storedData;

  function set(string memory x) public {
    storedData = x;
  }

  function get() public view returns (string memory) {
    return storedData;
  }
}
*/