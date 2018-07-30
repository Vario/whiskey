// The path module provides utilities for working with file and directory paths.
const path = require('path')

// fs-extra adds file system methods that aren't included in the native fs module
// and adds promise support to the fs methods.
const fs = require('fs-extra')

// It is used to compile solidity files
const solc = require('solc')

// This code removes a file or directory inside the Build directory
// __dirname returns the current the directory path
const buildPath = path.resolve(__dirname, 'build')
fs.removeSync(buildPath)

// It returns WhiskeyTaste.sol path
const contractPath = path.resolve(__dirname, 'contracts', 'WhiskeyTaste.sol')

// Get the content of WhiskeyTaste.sol
const contractSource = fs.readFileSync(contractPath, 'utf8')

// This code compile the contract code and return the contracts object
const output = solc.compile(contractSource, 1).contracts

// Ensures that the directory 'Build' exists. If the directory structure does not exist, it is created.
fs.ensureDirSync(buildPath)

// Create a JSON file with contract. It will be used to create contract instance from Angular application.
fs.outputJsonSync(
  path.resolve(buildPath, 'whiskeytaste.json'),
  output[':WhiskeyTaste']
)

// Export contract
module.exports = output[':WhiskeyTaste']

