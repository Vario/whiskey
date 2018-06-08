import { Injectable } from '@angular/core'

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore'

import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable()
export class WhiskeyService {
  whiskeyCollection: AngularFirestoreCollection<any>

  constructor(private afs: AngularFirestore) {
    this.whiskeyCollection = this.afs.collection('whiskeys', ref => ref.orderBy('time', 'desc').limit(5))
  }

  getData(): Observable<any[]> {
    // ['added', 'modified', 'removed']
    return this.whiskeyCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data()
          return { id: a.payload.doc.id, ...data }
        })
      })
    )
  }

  getWhiskey(id: string) {
    return this.afs.doc<any>(`whiskeys/${id}`)
  }

  createWhiskey(content: string) {
    const whiskey = {
      content,
      hearts: 0,
      time: new Date().getTime()
    }
    return this.whiskeyCollection.add(whiskey)
  }

  updateWhiskey(id: string, data: any) {
    return this.getWhiskey(id).update(data)
  }

  deleteWhiskey(id: string) {
    return this.getWhiskey(id).delete()
  }
}
