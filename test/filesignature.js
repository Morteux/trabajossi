const FileSignature = artifacts.require("./FileSignature.sol");

contract("FileSignature", accounts => {
  it("...should store the value 89.", async () => {
    const fileSignatureInstance = await FileSignature.deployed();

    // Set value of 89
    await fileSignatureInstance.set(89, { from: accounts[0] });

    // Get stored value
    const storedData = await fileSignatureInstance.get.call();

    assert.equal(storedData, 89, "The value 89 was not stored.");
  });
});
