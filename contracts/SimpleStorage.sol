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

contract FileStorage {

  struct File{
    //Información de archivo
    string name;      //Nombre
    string ext;       //Extensión
    uint size;        //Tamaño
    uint downloads;   //Número de descargas
    address owner;    //Propietario
    uint date; //El tipo no se si es correcto    //Fecha de subida

    //Control de derechos de autor
    string IPFSHash;        //Hash del archivo en IPFS
    string transactionHash; //Hash de la transacción que lo subió a IPFS
  }

  //string[] hashes;
  File[] files;

  function set(string memory newHash) public {
    File memory newFile = File('', '', 0, 0, msg.sender, 0, newHash, '');

    files.push(newFile);
  }

  function get(string memory oldHash) public view returns (string memory name, string memory ext, uint size, uint downloads,
                                          address owner,  uint date, string memory IPFSHash, string memory transactionHash) {
    File memory file = File('', '', 0, 0, msg.sender, 0, '', '');

    for (uint i = 0; i < files.length; i++) {
      if(keccak256(abi.encodePacked((files[i].IPFSHash))) == keccak256(abi.encodePacked((oldHash)))) file = files[i];
    }

    return(file.name, file.ext, file.size, file.downloads, file.owner, file.date, file.IPFSHash, file.transactionHash);
  }

  // Devuelve la información del archivo que se va a descargar
  function download(string memory oldHash) public view returns (string memory name, string memory ext, uint size, uint downloads,
                                          address owner,  uint date, string memory IPFSHash, string memory transactionHash) {
  {
      require(fileId >= 0 && fileId < files.length, "Error en el índice al acceder a los archivos");
      files[fileId].downloads++;
      return files[fileId];
  }

  // Devuelve la información del archivo que se va a descargar
  function upload(string memory name, string memory ext, uint size, uint downloads,
    address owner,  uint date, string memory IPFSHash, string memory transactionHash) public
  {
    //File memory newfile = File(name, ext, size, downloads, owner/*msg.sender*/, date, IPFSHash, transactionHash);

    files.push(File(name, ext, size, downloads, owner, date, IPFSHash, transactionHash)); //En vez de owner, msg.sender

    //File newFile = new File(name, ext, size, 0, msg.sender, now);
    //files.push(newFile);
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