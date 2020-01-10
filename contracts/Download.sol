pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;   //Esperimental es necesario para "File memory" (?)

/*
ARRAYS
length
push() devuelve el elemento del final
push(x) inserta x al final
pop() elimina el elemento del final
*/

contract Download {

    struct File {
        bytes32 name;       //Nombre
        bytes3 ext;         //Extensión
        uint size;          //Tamaño
        uint downloads;     //Número de descargas
        address uploader;   //Propietario
        bytes32 source;     //donde se guarda
        uint date; //El tipo no se si es correcto    //Fecha de subida
    }

    File[] public files;
    //mapping(File => address) private uploaders;

    // Devuelve la información del archivo que se va a descargar
    function download(uint fileId) public returns (File memory)
    {
        require(fileId >= 0 && fileId < files.length, "Error en el índice al acceder a los archivos");

        files[fileId].downloads++;

        return files[fileId];
    }

    // Devuelve la información del archivo que se va a descargar
    function upload(bytes32 name, bytes3 ext, uint size) public
    {
        //File newFile = new File(name, ext, size, 0, msg.sender, now);
        //files.push(newFile);
    }

    // Devuelve la información de todos los archivos
    function getFiles() public returns (File[] memory)
    {
        return files;
    }
    
    function setFiles(File[] memory newFiles) public
    {
        uint i = 0;
        for (i = 0; i < files.length; i++) {
            files[i].name = newFiles[i].name;
            files[i].ext = newFiles[i].ext;
            files[i].size = newFiles[i].size;
            files[i].downloads = newFiles[i].downloads;
            files[i].uploader = newFiles[i].uploader;
            files[i].source = newFiles[i].source;
            files[i].date = newFiles[i].date;
        }
    }
/*
    function plusDownLD(uint fileId) private {
        files[fileId].downloads ++;
    }

    function downLd(uint fileId) public returns (uint) {
        require(fileId >= 0 && fileId < size);
        plusDownLD(fileId);
        return fileId;
    }
    */
}