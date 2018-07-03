import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { fromPromise } from 'rxjs/observable/fromPromise'
import { ContractsService } from '../../../components/contract/contracts.service'
import whiskeyTasteArtifact from '../../../../../smart_contracts/build/whiskeytaste.json'
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore'
import { AuthService } from './auth.service'
import { AlertService } from './alert.service'
import Web3 from 'web3'

@Injectable()
export class WhiskeyTasteService {
  othersTastesForMyWhiskeyCollection: AngularFirestoreCollection<any>
  myWhiskeysToTasteCollection: AngularFirestoreCollection<any>
  private contractDeployedAt: '0xEc3c889F6190c78E5497e2C64F82ea72db80F054'
  private interface = (<any>whiskeyTasteArtifact).interface
  private bytecode = (<any>whiskeyTasteArtifact).bytecode
  private accounts: string[]
  private tastes: any[]

  constructor(
    private afs: AngularFirestore,
    private authService: AuthService,
    private contractsService: ContractsService,
    private alertService: AlertService
  ) {
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
  getWhiskeyTaste(id: string): any {
    return this.afs.doc<any>(`tastes/${id}`)
  }
  setWhiskeyTastePaid(data: any): Promise<boolean> {
    return new Promise((resolve, reject) => {
      console.log('set as paid for ' + data.id)
      let taste = this.getWhiskeyTaste(data.id)
      this.alertService.showToaster('setting taste as paid for taste ' + data.contractId + ' on blockchain')
      this.contractsService
        .getContract(JSON.parse(this.interface), data.contractId)
        .then(contract => {
          console.log(contract)
          let accounts = this.contractsService.getAccounts()
          console.log('update contract in blockchain for: ' + accounts[0])
          contract.methods.whiskeyTastePaid().call({ from: accounts[0], gas: '1000000' }, function(error, result) {
            console.log('contract method called')
            console.log(error)
            console.log(result)
            taste.update({ paid: true })
          })
        })
        .catch(error => {
          this.alertService.showToaster('Error setting whiskey taste ' + data.id + ' as paid on blockchain')
          console.log(error)
          reject(error)
        })
    })
  }
  private createTaste(whiskey: any, tasterID: string, contractID: string) {
    console.log('new taste for whiskey: ' + whiskey.whiskeyId + ' from ' + tasterID)
    const t = {
      whiskeyId: whiskey.id,
      taster: tasterID,
      supplier: whiskey.ownerid,
      price: whiskey.price,
      paid: false,
      contractId: contractID,
      createdAt: new Date().getTime()
    }
    return this.myWhiskeysToTasteCollection.add(t)
  }
  tasteWhiskey(whiskey: any, tasterId: string): Promise<string> {
    //
    return new Promise((resolve, reject) => {
      this.alertService.showToaster('creating whiskey taste for ' + whiskey.whiskeyId + ' on blockchain')
      this.contractsService
        .createContract(JSON.parse(this.interface), this.bytecode, [whiskey.owner, whiskey.id, whiskey.price])
        .then(contractAddress => {
          console.log('contract created on blockchain')
          this.createTaste(whiskey, tasterId, contractAddress).then(taste => {
            console.log('whiskey taste created: ' + taste.id)
            this.alertService.showToaster('Whiskey taste Created for whiskey ' + whiskey.whiskeyId)
            resolve(taste.id)
          })
        })
        .catch(error => {
          this.alertService.showToaster('Error creating whiskey taste for ' + whiskey.whiskeyId + ' on blockchain')
          console.log(error)
          reject(error)
        })
    })
  }
}
