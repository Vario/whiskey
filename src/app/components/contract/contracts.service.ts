/*
https://blog.fundrequest.io/calling-your-first-smart-contract-function-with-web3-and-angular5-aa1bde26a55c
Solidity Project
https://github.com/Nikhil22/angular-truffle-starter-dapp

*/
import { environment } from '../../../environments/environment'
import { Observable } from 'rxjs'
import { Injectable } from '@angular/core'
import Web3 from 'web3'
declare let require: any
declare let window: any

@Injectable({
  providedIn: 'root'
})
export class ContractsService {
  public web3: any
  private accounts: string[]

  constructor() {
    this.instantiateWeb3()
  }

  private async instantiateWeb3() {
    console.log('check ethereum network state')
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof window.web3 !== 'undefined') {
      console.warn(
        "Using web3 detected from external source. " +
        "If you find that your accounts don't appear or you have 0 MetaCoin, " +
        "ensure you've configured that source properly. If using MetaMask, see the following link. " +
        "Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask"
      )

      // Use Mist/MetaMask's provider
      console.log('current provider: ' + window.web3.currentProvider)
      this.web3 = new Web3(window.web3.currentProvider)
      console.log(window.web3.currentProvider)

      this.accounts = await this.web3.eth.getAccounts()
      console.log('accounts: ' + this.accounts)
    } else {
      console.warn(
        "No web3 detected. Falling back to ${environment.HttpProvider}. " +
        "You should remove this fallback when you deploy live, as it's inherently insecure. " +
        "Consider switching to Metamask for development."
      )
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      this.web3 = new Web3(new Web3.providers.HttpProvider(environment.HttpProvider))
    }
  }

  getAccounts(): Observable<any> {
    return Observable.create(observer => {
      this.web3.eth.getAccounts((err, accs) => {
        if (err != null) {
          observer.error('There was an error fetching your accounts.')
        }

        if (accs.length === 0) {
          observer.error("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.")
        }

        console.log("Accounts: " + accs)
        observer.next(accs)
        observer.complete()
      })
    })
  }

  createContract(contractInterface: any, bytecode: any, parameters: Array<any>): Promise<string> {
    return new Promise((resolve, reject) => {
      console.log('create taste in blockchain')
      this.web3.eth.net.getId().then(networkId => {
        if (networkId != environment.blockchain.network) {
          reject('wrong network connected')
        } else {
          console.log('connected to correct network')
          //Continue
          console.log('create contract for: ' + contractInterface)
          this.deployContract(contractInterface, bytecode, parameters)
            .then(contractID => {
              resolve(contractID)
            })
            .catch(error => {
              reject(error)
            })
        }
      })
    }) as Promise<string>
  }

  getContract(contractInterface: any, contractDeployedAt: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.web3.eth.net
        .getId()
        .then(networkId => {
          if (networkId != environment.blockchain.network) {
            reject('wrong network connected')
          } else {
            console.log('connected to correct network')
            //Continue
            console.log('create contract for: ' + contractInterface)
            let contract = new this.web3.eth.Contract(
              contractInterface, // contract interface
              contractDeployedAt // address where contract is deployed
            )
            console.log(contract)
            resolve(contract)
          }
        })
        .catch(error => {
          console.log('error checking blockchain: ' + error)
          reject(error)
        })
    }) as Promise<string>
  }

  private deployContract(contractInterface: any, bytecode: any, parameters: Array<any>): Promise<string> {
    return new Promise((resolve, reject) => {
      this.web3.eth
        .getAccounts()
        .then(accounts => {
          console.log('creating contract in blockchain for: ' + accounts[0])
          new this.web3.eth.Contract(contractInterface)
            .deploy({
              data: bytecode,
              arguments: parameters
            })
            .send({ from: accounts[0], gas: '1000000' })
            .then(result => {
              console.log('contract deployed to' + result.options.address)
              resolve(result.options.address)
            })
            .catch(error => {
              console.log('error creating contract in blockchain:' + error)
              reject(error)
            }) // 0.01 cent
        })
        .catch(error => {
          console.log('error getting blockchain account: ' + error)
          reject(error)
        })
    }) as Promise<string>
  }
}
