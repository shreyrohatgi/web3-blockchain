const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')
const web3 = new Web3(ganache.provider())

const compiledA = require('../ethereum/build/A.json')
const compiledB = require('../ethereum/build/B.json')

let accounts
let factory1
let factory2

beforeEach(async () => {
  accounts = await web3.eth.getAccounts()
  factory1 = await new web3.eth.Contract(JSON.parse(compiledA.interface))
    .deploy({ data: compiledA.bytecode })
    .send({ from: accounts[0], gas: '1000000' })

  factory2 = await new web3.eth.Contract(JSON.parse(compiledB.interface))
    .deploy({ data: compiledB.bytecode })
    .send({ from: accounts[0], gas: '1000000' })
})

describe('Contracts', () => {
  it('deploys both the contracts', () => {
    assert.ok(factory1.options.address)
    assert.ok(factory2.options.address)
  })
  it('check if address is set', async () => {
    const add = factory2.options.address
    await factory1.methods
      .setAddressB(add)
      .send({ from: accounts[0], gas: '1000000' })

    const data = await factory1.methods.deployedContractAddress().call()
    assert.equal(data, factory2.options.address)
  })
  it('setting value to contract B from its own contract', async () => {
    await factory2.methods
      .setMessage('Hello')
      .send({ from: accounts[0], gas: '1000000' })
    const data = await factory2.methods.getMessage().call()
    assert.equal(data, 'Hello')
  })
  it('setting value to contract B from another contract', async () => {
    const add = factory2.options.address
    await factory1.methods
      .setAddressB(add)
      .send({ from: accounts[0], gas: '1000000' })

    await factory1.methods
      .setStringInAnotherContract('Hello!')
      .send({ from: accounts[0], gas: '1000000' })

    const data = await factory2.methods.getMessage().call()
    assert.equal(data, 'Hello!')
  })
  it('calling view function from one contract to another', async () => {
    const add = factory2.options.address
    await factory1.methods
      .setAddressB(add)
      .send({ from: accounts[0], gas: '1000000' })

    await factory2.methods
      .setMessage('Hello!')
      .send({ from: accounts[0], gas: '1000000' })
    const str = await factory1.methods.getStringFromAnotherContract().call()
    assert.equal(str, 'Hello!')
  })
})
