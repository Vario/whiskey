import { Injectable } from '@angular/core'

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore'

import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { WhiskeyBottle } from './whiskeybottle.model'

@Injectable()
export class WhiskeyService {
  whiskeybottleCollection: AngularFirestoreCollection<any>
  whiskeyCollection: AngularFirestoreCollection<any>
  whiskeyDocument: AngularFirestoreDocument<any>

  constructor(private afs: AngularFirestore) {
    this.whiskeybottleCollection = this.afs.collection('whiskeybottles', ref =>
      ref.orderBy('createdAt', 'desc').limit(5)
    )
  }

  getWhiskeyBottles(): Observable<any[]> {
    return this.whiskeybottleCollection.snapshotChanges().pipe(
      map(actions => {
        let res = actions.map(a => {
          const data = a.payload.doc.data()
          return { id: a.payload.doc.id, ...data }
        })
        return res
      })
    )
  }

  getWhiskey(id: string) {
    return this.afs.doc<any>(`whiskeybottles/${id}`)
  }

  createWhiskey(name: string, brand: string) {
    const whiskey = {
      name: name,
      brand: brand,
      hearts: 0,
      createdAt: new Date().getTime()
    }
    return this.whiskeybottleCollection.add(whiskey)
  }

  updateWhiskey(whiskey: WhiskeyBottle) {
    //return this.getWhiskey(id).update(data)
  }
}
