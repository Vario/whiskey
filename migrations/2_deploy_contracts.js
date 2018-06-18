var WhiskeyTaste = artifacts.require('./WhiskeyTaste.sol')

module.exports = function (deployer) {
  deployer.deploy(WhiskeyTaste)
}
