const Adoption = artifacts.require("Adoption");

contract("Adoption", function (accounts) {
  describe('First group of tests', () => {
    let instance; 

    before(async () => {
      instance = await Adoption.deployed();
    });

    it('User should adopt a pet', async () => {
      await instance.adopt.sendTransaction(8, {from: accounts[0]});
      let adopter = await instance.adopters.call(8);
      assert.equal(adopter, accounts[0], "Incorrect owner address");
    });

    it('Should get array of adopters addresses by petId', async () => {
      let adopters = await instance.getAdopters.call();
      assert.equal(adopters[8], accounts[0], "Owner of petId should be recorder in array");
    });

    it('Should throw error if invalid petId is given', async () => {
      try {
        await instance.adopt.sendTransaction(17, {from: accounts[0]});
        assert.fail(true,false,"This function did not throw error");
      } catch (error) {
        assert.include(String(error), "revert", `Expected "revert" but instead got ${error}`);
      }
    });

  });
});
