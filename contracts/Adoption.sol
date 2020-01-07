pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;   //Esperimental es necesario para "File memory" (?)

contract Adoption {

    struct File {
        bytes32 name;       //Nombre
        bytes3 ext;         //Extensión
        uint size;          //Tamaño
        uint downloads;     //Número de descargas
        address uploader;   //Propietario
        bytes32 date; //El tipo no se si es correcto    //Fecha de subida
    }

    File[] public files;
    uint size = 0;

    // Devuelve la información del archivo que se va a descargar
    function download(uint fileId) public returns (File memory)
    {
        require(fileId >= 0 && fileId < size);

        files[fileId].uploader = msg.sender;

        return files[fileId];
    }

    // Devuelve la información de todos los archivos
    function getFiles(uint fileId) public returns (File[] memory)
    {
        return files;
    }







    //////////////////////////////////////////////////////////////////////
    address[16] public adopters;

    // Adopting a pet
    function adopt(uint petId) public returns (uint) {
        require(petId >= 0 && petId <= 15);

        adopters[petId] = msg.sender;

        return petId;
    }
    // Retrieving the adopters

    function getAdopters() public view returns (address[16] memory) {
        return adopters;
    }
}