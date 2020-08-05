
const Graph = artifacts.require("Graph");

contract('Graph', async accounts => {
  
  it('should follow contract', async () => {
    let instance = await Graph.deployed();
    let follow = await instance.follow(accounts[1])
    let is = await instance.isFollowedBy(accounts[1], accounts[0])
    assert.equal(is.valueOf(), true)
  });

  it('should unfollow contract', async () => {
    let instance = await Graph.deployed();
    let follow = await instance.follow(accounts[1])
    let unfollow = await instance.unfollow(accounts[1])
    let is = await instance.isFollowedBy(accounts[1], accounts[0])
    assert.equal(is.valueOf(), false)
  });

});
