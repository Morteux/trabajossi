# Guía de instalación y uso del proyecto con Blockchain Ethereum (Truffle, Ganache, MetaMask, IPFS, React.js)

## Instalar las herramientas
 
### 1. Instalar [MetaMask](https://metamask.io/)
 - Instalar MetaMask [aquí](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=es).

### 2. Instalar [Truffle](https://www.trufflesuite.com/)

##### 2.1. Requisitos previos
 - Instalar Git [aquí](https://git-scm.com/downloads).
 - Instalar Node LTS [aquí](https://nodejs.org/en/). 
   - Selecciona la casilla para instalar automáticamente Chocolatey (**¡TARDA MUCHO!**).
   
##### 2.2. Para instalar Truffle
 - Ejecutar el comando `npm install -g truffle`. Incluye:
   - Truffle
   - Solidity
   - Node
   - Web3.js (https://web3js.readthedocs.io/en/v1.2.4/)
 - Para comprobar que se ha instalado todo con éxito ejecuta `truffle version`.

### 3. Instalar [Ganache](https://www.trufflesuite.com/ganache)
 - Instalar Ganache. https://www.trufflesuite.com/ganache

### 4. Instalar [IPFS](https://ipfs.io/)

##### 4.1. Requisitos previos
 - Instalar Truffle en el [punto 2](https://github.com/Morteux/trabajossi/blob/master/README.md#2-instalar-truffle).
 
##### 4.2. Para instalar Truffle
 - Abrir una consola de comandos como administrador (El prompt debe quedar así `C:\WINDOWS\system32>`).
 - Ejecutar el comando `choco install ipfs-desktop`.
 - Ejecutar IPFS Desktop por primera vez y darle permiso de acceso al firewall de Windows.

##### 4.3. Para instalar Truffle (alternativa)
 - `npm install ipfs` o `npm install ipfs-http-client` (falta por probar)

### 5. Instalar [ReactJS](https://es.reactjs.org/)
 - (?)

## Pasos para poner en funcionamiento la aplicación en modo desarrollador

 - Abrir Ganache:
    - [x] Seleccionar *Quickstart*.
 - Abrir MetaMask:
    - [ ] Si no tiene cuenta, selecciona *Import wallet* e introduce el mnemónico que proporciona Ganache y escoge la contraseña que prefiera.
    - [x] Si tiene una cuenta, dirigete a *Configuración*->*Avanzado*->*Reiniciar cuenta*.
 - Abrir una consola de comandos en el directorio raiz del proyecto (**versión Windows**):
    - [x] Ejecuta `truffle.cmd migrate`.











FORMATO .md https://help.github.com/en/github/writing-on-github/basic-writing-and-formatting-syntax
# Título
## Subtítulo

[Enlace](https://pages.github.com/)

`código`

![alt text](url.png)

**negrita**

*cursiva*

task list
- [x] Finish my changes
- [ ] Push my commits to GitHub
- [ ] Open a pull request
