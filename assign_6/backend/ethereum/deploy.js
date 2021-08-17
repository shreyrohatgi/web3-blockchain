const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const compiled = require('./build/SignatureVerification.json')

const provider = new HDWalletProvider(
  'yard very economy slot acid solution denial solar suspect version sweet inside',
  'https://rinkeby.infura.io/v3/5c9dffa7de394870b7c4c4617ecdefa5'
)

console.log(compiled.bytecode)

const web3 = new Web3(provider)

const deploy = async () => {
  const accounts = await web3.eth.getAccounts()
  console.log('Attempting to deploy from account', accounts[0])
  const result = await new web3.eth.Contract(JSON.parse(compiled.interface))
    .deploy({
      data: compiled.bytecode,
    })
    .send({ gas: '1000000', from: accounts[0] })

  console.log('Contract deployed to', result.options.address)
}

// deploy()
