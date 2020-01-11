var FileSignature = artifacts.require("./FileSignature.sol");

module.exports = function(deployer) {
  deployer.deploy(FileSignature);
};
