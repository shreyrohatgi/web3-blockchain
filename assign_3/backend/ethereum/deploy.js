const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')

const compiledContract = require('./build/SendEther.json')

const provider = new HDWalletProvider(
  'yard very economy slot acid solution denial solar suspect version sweet inside',
  'https://rinkeby.infura.io/v3/5c9dffa7de394870b7c4c4617ecdefa5'
)

const web3 = new Web3(provider)

console.log(compiledContract.interface)

const deploy = async () => {
  const accounts = await web3.eth.getAccounts()
  console.log('Attempting to deploy from account', accounts[0])
  const result = await new web3.eth.Contract(
    JSON.parse(compiledContract.interface)
  )
    .deploy({
      data: compiledContract.bytecode,
    })
    .send({ gas: '1000000', from: accounts[0] })

  console.log('Contract deployed to', result.options.address)
}

deploy()
