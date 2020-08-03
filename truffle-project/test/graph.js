
const Graph = artifacts.require("Graph");

contract('Graph', (accounts) => {
  let accounts = await Web3.eth.getAccounts()

  it('should follow contract', async () => {
    const graphInstance = await Graph.deployed();

    console.log(graphInstance);
    assert.equal(true, true, "n word");
  });
});
