import { Injectable } from '@angular/core'

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { AuthService } from './auth.service'
import { WhiskeyBottle } from './../../whiskey/whiskeybottle.model'
import { WhiskeyTasteService } from './whiskeytaste.service'

@Injectable()
export class WhiskeyService {
  whiskeybottleCollection: AngularFirestoreCollection<any>
  constructor(
    private afs: AngularFirestore,
    private authService: AuthService,
    private whiskeyTasteService: WhiskeyTasteService
  ) {
    this.whiskeybottleCollection = this.afs.collection('whiskeybottles', ref =>
      ref.orderBy('createdAt', 'desc').limit(5)
    )
  }

  getWhiskeyBottles(): Observable<any[]> {
    console.log('get whiskeybottles')
    return this.whiskeybottleCollection.snapshotChanges().pipe(
      map(actions => {
        let res = actions.map(a => {
          const data = a.payload.doc.data()
          console.log('whiskey: ' + a.payload.doc.id)
          return { id: a.payload.doc.id, ...data }
        })
        return res
      })
    )
  }

  getWhiskey(id: string) {
    return this.afs.doc<any>(`whiskeybottles/${id}`)
  }

  createWhiskey(name: string, brand: string, price: number, size: number) {
    console.log('new whiskey for: ' + this.authService.userID)
    const w = {
      name: name,
      brand: brand,
      hearts: 0,
      createdAt: new Date().getTime(),
      ownerid: this.authService.userID,
      price: price,
      size: size,
      imageUrl: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      usedtastes: 0,
      available: true
    }
    return this.whiskeybottleCollection.add(w)
  }

  updateWhiskey(id: string, data: WhiskeyBottle) {
    return this.getWhiskey(id).update(data)
  }

  tasteWhiskey(data: any) {
    console.log('taste whiskey:' + data.id)
    this.whiskeyTasteService.tasteWhiskey(data, this.authService.userID)
    //Promise for tasting with blockchain
    /*this.whiskeyTasteService.tasteWhiskey(data.id, data.supplier, data.price).then(contractAddress => {
      console.log('contract for taste: ' + contractAddress)
    })*/
  }
}
