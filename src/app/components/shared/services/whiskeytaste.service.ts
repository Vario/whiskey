import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { fromPromise } from 'rxjs/observable/fromPromise'
import { ContractsService } from '../../../components/contract/contracts.service'
import whiskeyTasteArtifact from '../../../../../smart_contracts/build/whiskeytaste.json'
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore'
import { AuthService } from './auth.service'

@Injectable()
export class WhiskeyTasteService {
  othersTastesForMyWhiskeyCollection: AngularFirestoreCollection<any>
  myWhiskeysToTasteCollection: AngularFirestoreCollection<any>
  private contractDeployedAt: '0xEc3c889F6190c78E5497e2C64F82ea72db80F054'
  private interface = (<any>whiskeyTasteArtifact).interface
  private accounts: string[]
  private tastes: any[]

  constructor(
    private afs: AngularFirestore,
    private authService: AuthService,
    private contractsService: ContractsService
  ) {
    console.log('get tastes for whiskeys from:' + authService.userID)
    this.othersTastesForMyWhiskeyCollection = this.afs.collection('tastes', ref =>
      ref.where('supplier', '==', authService.userID).orderBy('createdAt', 'desc')
    )

    console.log('get tastes for:' + authService.userID)
    this.myWhiskeysToTasteCollection = this.afs.collection('tastes', ref =>
      ref.where('taster', '==', authService.userID).orderBy('createdAt', 'desc')
    )

    console.log('connected to ethereum network:' + contractsService.checkNetwork())
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
      this.testTaste()
      console.log('Create contract')
      //create a exhibition contract instance
      if (this.contractsService.checkNetwork()) {
        //var taste = this.contractsService.createContract(this.interface, this.contractDeployedAt)
        //console.log(taste)
        this.createTaste(whiskey, tasterId).then(taste => {
          console.log('whiske taste craeted: ' + taste.id)
          resolve(taste.id)
        })
      } else {
        console.log('connected to wrong network')
      }
    })
  }
  private async testTaste() {
    var contract = new this.contractsService.web3.eth.Contract(
      JSON.parse(this.interface), // contract interface
      this.contractDeployedAt // address where contract is deployed
    )
    console.log('contract:' + contract)
  }
}
