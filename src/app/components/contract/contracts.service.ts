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
    this.checkAndInstantiateWeb3()
  }

  private async checkAndInstantiateWeb3() {
    console.log('check ethereum network state')
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof window.web3 !== 'undefined') {
      console.warn(
        "Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask"
      )

      // Use Mist/MetaMask's provider
      this.web3 = new Web3(window.web3.currentProvider)
      this.accounts = await this.web3.eth.getAccounts()
    } else {
      console.warn(
        "No web3 detected. Falling back to ${environment.HttpProvider}. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask"
      )
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      this.web3 = new Web3(new Web3.providers.HttpProvider(environment.HttpProvider))
    }
  }

  checkNetwork(): boolean {
    //TODO check network here?
    if (this.web3.version.network == environment.blockchain.network) {
      return true
    } else {
      console.log('Please connect to the Rinkeby network')
      return false
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

        observer.next(accs)
        observer.complete()
      })
    })
  }

  createContract(int: any, contractDeployedAt: string) {
    return new this.web3.eth.Contract(
      JSON.parse(int), // contract interface
      contractDeployedAt // address where contract is deployed
    )
  }
  /*
  Observe account variable if it is changed in metamask
  Observable.timer(0, 1000).subscribe(() => { 
    if(this._currentAccount != web3.eth.accounts[0]) { 
    doUpdate();
    }
   }
*/
  /*
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
*/
  /*
  Method to get accout for balance etc..
   */
  /*
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
  */
}
