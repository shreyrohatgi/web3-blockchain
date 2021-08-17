const path = require('path')
const solc = require('solc')
const fs = require('fs-extra')

// const buildPath = path.resolve(__dirname, 'build')
// fs.removeSync(buildPath)

const contractPath = path.resolve(__dirname, 'contracts', 'PaymentChannel.sol')

const source = fs.readFileSync(contractPath, 'utf8')

const input = {
  language: 'Solidity',
  sources: {
    'PaymentChannel.sol': {
      content: source,
    },
  },

  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
}

function findImports(path) {
  if (path === 'PaymentChannel.sol') return { contents: source }
  else return { error: 'File not found' }
}

const output = JSON.parse(solc.compile(JSON.stringify(input), findImports))
module.exports.output = output

// const output = solc.compile(source, 1).contracts

// fs.ensureDirSync(buildPath)

// for (let contract in output) {
//   fs.outputJsonSync(
//     path.resolve(buildPath, contract.replace(':', '') + '.json'),
//     output[contract]
//   )
// }

// function compileContract() {
//   let PaymentChannelSOl = fs.readFileSync(
//     './contracts/PaymentChannel.sol',
//     'utf8'
//   )
//   let complierInput = {
//     language: 'Solidity',
//     sources: {
//       'PaymentChannel.sol': {
//         content: PaymentChannelSOl,
//       },
//     },
//     settings: {
//       optimizer: {
//         enabled: true,
//       },
//       outputSelection: {
//         '*': {
//           '*': ['*'],
//         },
//       },
//     },
//   }
//   console.log('compiling contract')
//   let compiledContract = JSON.parse(solc.compile(JSON.stringify(complierInput)))
//   console.log('Contract Compiled')
//   for (let contractName in compiledContract.contracts['PaymentChannel.sol']) {
//     console.log(
//       contractName,
//       compiledContract.contracts['PaymentChannel.sol'][contractName].abi
//     )
//     let abi = compiledContract.contracts['PaymentChannel.sol'][contractName].abi
//     fs.writeFileSync(
//       `./contracts/build/${contractName}_abi.json`,
//       JSON.stringify(abi)
//     )
//     return compiledContract.contracts['PaymentChannel.sol'][contractName]
//   }
// }

// compileContract()
