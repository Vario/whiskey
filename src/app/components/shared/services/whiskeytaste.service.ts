import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { fromPromise } from 'rxjs/observable/fromPromise'
import { ContractsService } from '../../../components/contract/contracts.service'
//import * as whiskeyTasteArtifacts from '../../../../build/contracts/WhiskeyTaste.json'
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore'
import { AuthService } from './auth.service'

@Injectable()
export class WhiskeyTasteService {
  othersTastesForMyWhiskeyCollection: AngularFirestoreCollection<any>
  myWhiskeysToTasteCollection: AngularFirestoreCollection<any>
  constructor(private afs: AngularFirestore, private authService: AuthService) {
    console.log('get tastes for whiskeys from:' + authService.userID)
    this.othersTastesForMyWhiskeyCollection = this.afs.collection('tastes', ref =>
      ref.where('supplier', '==', authService.userID).orderBy('createdAt', 'desc')
    )

    console.log('get tastes for:' + authService.userID)
    this.myWhiskeysToTasteCollection = this.afs.collection('tastes', ref =>
      ref.where('taster', '==', authService.userID).orderBy('createdAt', 'desc')
    )
  }
  getMyWhiskeysToTasteCollection(): Observable<any[]> {
    console.log('get whiskeybottle tastes')
    return this.myWhiskeysToTasteCollection.snapshotChanges().pipe(
      map(actions => {
        let res = actions.map(a => {
          const data = a.payload.doc.data()
          console.log('taste: ' + a.payload.doc.id + ' data:' + data.createdAt)
          return { id: a.payload.doc.id, ...data }
        })
        return res
      })
    )
  }
  getOthersTastesForMyWhiskeyCollection(): Observable<any[]> {
    console.log('get whiskeybottle tastes')
    return this.othersTastesForMyWhiskeyCollection.snapshotChanges().pipe(
      map(actions => {
        let res = actions.map(a => {
          const data = a.payload.doc.data()
          console.log('taste: ' + a.payload.doc.id + ' data:' + data.createdAt)
          return { id: a.payload.doc.id, ...data }
        })
        return res
      })
    )
  }
  getWhiskeyTaste(id: string) {
    return this.afs.doc<any>(`tastes/${id}`)
  }
  setWhiskeyTastePaid(data: any) {
    console.log('set as paid for ' + data.id)
    this.getWhiskeyTaste(data.id).update({ paid: true })
  }
  private createTaste(whiskey: any, tasterID: string) {
    console.log('new taste for whiskey: ' + whiskey.whiskeyId + ' from ' + tasterID)
    const t = {
      whiskeyId: whiskey.id,
      taster: tasterID,
      supplier: whiskey.ownerid,
      price: whiskey.price,
      paid: false,
      contractId: '',
      createdAt: new Date().getTime()
    }
    return this.myWhiskeysToTasteCollection.add(t)
  }
  tasteWhiskey(whiskey: any, tasterId: string): Promise<string> {
    //
    return new Promise((resolve, reject) => {
      console.log('Create contract')
      /*
      var taster = this.web3Ser.web3.eth.accounts[0]
      if (this.web3Ser.checkNetwork()) {
        resolve('connected')
      } else {
        reject('Please connect to correct network')
      }*/
      this.createTaste(whiskey, tasterId).then(taste => {
        console.log('whiske taste craeted: ' + taste.id)
        resolve(taste.id)
      })
    })

    /*abiDefinition = JSON.parse(compiledCode.contracts[':Voting'].interface)
        VotingContract = web3.eth.contract(abiDefinition)
        byteCode = compiledCode.contracts[':Voting'].bytecode
          // the following line is what you need to do get the address
        deployedContract = VotingContract.new(['Rama','Nick','Jose'],{data: byteCode, from:
        web3.eth.accounts[0], gas: 4700000}) 
        deployedContract.address
        /contractInstance = VotingContract.at(deployedContract.address)*/
    /*var newTasteContract = new this.web3Ser.web3.eth.Contract(whiskeyTasteArtifacts, {
          from: taster, // default from address
          gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
        })

        newTasteContract
          .deploy({
            arguments: [123, 'My String']
          })
          .send(
            {
              from: taster,
              gas: 1500000,
              gasPrice: '30000000000000'
            },
            function(error, transactionHash) {
              console.log('')
            }
          )
          .on('error', function(error) {
            console.log('contract error:' + error)
          })
          .on('transactionHash', function(transactionHash) {
            console.log('transaciton hash:' + transactionHash)
          })
          .on('receipt', function(receipt) {
            console.log('receipt.contractAddress:' + receipt.contractAddress) // contains the new contract address
          })
          .on('confirmation', function(confirmationNumber, receipt) {
            console.log('confirmation:' + confirmationNumber)
          })
          .then(function(newContractInstance) {
            console.log('created contract:' + newContractInstance.options.address) // instance with the new contract address
            console.log('created contract object:' + newContractInstance)
            resolve(newContractInstance.options.address)
          })
          */
  }
}
/*let meta
    return Observable.create(observer => {
      this.WhiskeyTaste.deployed()
        .then(instance => {
          meta = instance
          return meta.sendCoin(to, amount, {
            from: from
          })
        })
        .then(() => {
          observer.next()
          observer.next()
        })
        .catch(e => {
          console.log(e)
          observer.error(e)
        })
    })*/
//}
/*getBalance(account): Observable<number> {
    let meta

    return Observable.create(observer => {
      this.WhiskeyTaste.deployed()
        .then(instance => {
          meta = instance
          //we use call here so the call doesn't try and write, making it free
          return meta.getBalance.call(account, {
            from: account
          })
        })
        .then(value => {
          observer.next(value)
          observer.complete()
        })
        .catch(e => {
          console.log(e)
          observer.error(e)
        })
    })
  }
*/
/*tasteWhiskey(from, to, amount): string {
    let meta
    return Observable.create(observer => {
      this.WhiskeyTaste.deployed()
        .then(instance => {
          meta = instance
          return meta.sendCoin(to, amount, {
            from: from
          })
        })
        .then(() => {
          observer.next()
          observer.next()
        })
        .catch(e => {
          console.log(e)
          observer.error(e)
        })
    })
  }*/
