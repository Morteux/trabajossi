pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;   //Esperimental es necesario para "File memory" (?)

contract Download {

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

    // Devuelve la información de todos los archivos
    function getFiles(uint fileId) public returns (File[] memory)
    {
        return files;
    }

    function plusDownLD(uint fileId) private {
        files[fileId].downloads ++;
    }

    function downLd(uint fileId) public returns (uint) {
        require(fileId >= 0 && fileId < size);
        plusDownLD(fileId);
        return fileId;
    }
}