/*
https://blog.fundrequest.io/calling-your-first-smart-contract-function-with-web3-and-angular5-aa1bde26a55c
Solidity Project
https://github.com/Nikhil22/angular-truffle-starter-dapp

*/
import { environment } from '../../../environments/environment'

import { Injectable } from '@angular/core'
import * as Web3 from 'web3'

declare let require: any
declare let window: any

let tokenAbi = require('./tokenContract.json')

@Injectable({
  providedIn: 'root'
})
export class ContractsService {
  /*
  Observe account variable if it is changed in metamask
  Observable.timer(0, 1000).subscribe(() => { 
    if(this._currentAccount != web3.eth.accounts[0]) { 
    doUpdate();
    }
   }
*/
  private _account: string = null
  private _web3: any

  private _tokenContract: any
  //adress of smart contract
  private _tokenContractAddress: string = environment.blockchain.contractAdress

  constructor() {
    if (typeof window.web3 !== 'undefined') {
      // Use Mist/MetaMask's provider
      this._web3 = new Web3(window.web3.currentProvider)

      //TODO check network here?
      if (this._web3.version.network !== environment.blockchain.networks.rinkeby) {
        alert('Please connect to the Rinkeby network')
      }
    } else {
      console.warn('Please use a dapp browser like mist or MetaMask plugin for chrome')
    }

    this._tokenContract = this._web3.eth.contract(tokenAbi).at(this._tokenContractAddress)
  }

  /*
  Method to get accout for balance etc..
   */
  private async getAccount(): Promise<string> {
    if (this._account == null) {
      this._account = (await new Promise((resolve, reject) => {
        this._web3.eth.getAccounts((err, accs) => {
          if (err != null) {
            alert('There was an error fetching your accounts.')
            return
          }

          if (accs.length === 0) {
            alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.")
            return
          }
          resolve(accs[0])
        })
      })) as string

      this._web3.eth.defaultAccount = this._account
    }

    return Promise.resolve(this._account)
  }

  public async getUserBalance(): Promise<number> {
    let account = await this.getAccount()

    return new Promise((resolve, reject) => {
      let _web3 = this._web3
      this._tokenContract.balanceOf.call(account, function(err, result) {
        if (err != null) {
          reject(err)
        }

        resolve(_web3.fromWei(result))
      })
    }) as Promise<number>
  }
}
