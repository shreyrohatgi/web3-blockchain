const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const compiled = require('./contracts/build/SimplePaymentChannel.json')
const provider = new HDWalletProvider(
  'yard very economy slot acid solution denial solar suspect version sweet inside',
  'https://rinkeby.infura.io/v3/5c9dffa7de394870b7c4c4617ecdefa5'
)

const web3 = new Web3(provider)

const deploy = async () => {
  const accounts = await web3.eth.getAccounts()
  console.log('Attempting to deploy from account', accounts[0])
  const result = await new web3.eth.Contract(compiled.abi)
    .deploy({
      data: compiled.data.bytecode.object,
      arguments: ['0x81E88A838DcaE7f777F5bD06dc0B861e8bA3A3DF', '9000000'],
    })
    .send({
      gas: '1000000',
      from: accounts[0],
      value: web3.utils.fromWei('2000000000000000000', 'wei'),
    })

  console.log('Contract deployed to', result.options.address)
}

deploy()
