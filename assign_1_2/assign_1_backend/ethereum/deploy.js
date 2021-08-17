const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const compiledA = require('./build/A.json')
const compiledB = require('./build/B.json')

const provider = new HDWalletProvider(
  'yard very economy slot acid solution denial solar suspect version sweet inside',
  'https://rinkeby.infura.io/v3/5c9dffa7de394870b7c4c4617ecdefa5'
)

const web3 = new Web3(provider)

const deploy = async () => {
  const accounts = await web3.eth.getAccounts()
  console.log('Attempting to deploy from account', accounts[0])
  const result1 = await new web3.eth.Contract(JSON.parse(compiledA.interface))
    .deploy({
      data: compiledA.bytecode,
    })
    .send({ gas: '1000000', from: accounts[0] })
  const result2 = await new web3.eth.Contract(JSON.parse(compiledB.interface))
    .deploy({
      data: compiledB.bytecode,
    })
    .send({ gas: '1000000', from: accounts[0] })

  console.log('Contract A deployed to', result1.options.address)
  console.log('Contract B deployed to', result2.options.address)
}

deploy()
